# Oto Nativeアプリ 録音ファイル取得・再生 実装ガイド

このドキュメントは、Oto MVPリポジトリ（バックエンド: FastAPI / フロントエンド: Next.js）を参照しながら、**録音済み（アップロード済み）音声をネイティブアプリ（iOS / Android / React Native 等）で取得・一覧表示・再生**するための実装ポイントをエンジニア向けにまとめたものです。API仕様書（`backend/API.md`）を前提として、追加で把握しておくと開発がスムーズになる要素（データモデル、画面構成、状態管理、サインドURLの扱い、メタデータ表示、エラーケースなど）を整理しています。

---

## 0. 用語と全体像（Mental Model）

Otoはユーザーが音声（会話・ミーティング等）をアップロードするとバックエンドが非同期で処理（保存→転写→AI解析→クリップ生成）し、ユーザーが**Conversation**単位で結果を参照できます。Conversationに関連する短い抜粋が**Clip**、全体書き起こしが**Transcript**、サマリやハイライト等を含むAI解析結果が**Analysis**として取得できます。これらはすべてFastAPIルータでエンドポイント化されています。

### エンティティ関係（概念）

```
User ─┬─ Conversation ─┬─ Transcript (1:1)
      │                ├─ Analysis   (1:1)
      │                └─ Clips      (1:N)
      └─ Points / Transactions
```

Conversationはアップロードした元音声ファイルに紐付き、処理ステータス（not\_started / processing / completed / failed）を持ちます。ClipはConversation区間を切り出した短尺音声＋メタデータ（タイトル、説明、コメント、キャプション）を保持します。

---

## 1. 認証・リクエストヘッダ

すべての保護されたエンドポイントはBearerトークンとユーザーIDヘッダが必要です。

* `Authorization: Bearer {privy_access_token}`
* `Oto-User-Id: {privy_user_id}`
  開発時はローカル `http://localhost:8000` をBase URLとして利用します。

> **実装Tip:** モバイルでのAPIクライアント層は、トークン更新（Privy SDK）とヘッダ付与を共通化したInterceptorを用意すると安全。

---

## 2. 録音（Conversation）取得〜再生フロー概観

録音アップロード後にユーザーが音声を聴けるまでの典型フローを時系列で示します。

1. **Conversation一覧取得**: `GET /conversation/list` でユーザーの最新30件（作成日時降順）を取得。開始/終了日時フィルタあり。
2. **Conversation詳細**: `GET /conversation/{conversation_id}` でステータスやメタを取得。
3. **処理ジョブ状態**: 解析完了か不明な場合 `GET /conversation/{conversation_id}/job` でPrefectジョブ状態を確認。
4. **Transcript取得**（任意）: `GET /transcript/{conversation_id}` でタイムコード付きテキスト。
5. **Analysis取得**（任意）: サマリ、ハイライト、インサイト等 `GET /analysis/{conversation_id}`。
6. **Clip一覧取得**: UIでハイライト区間を再生したい場合 `GET /clip/list?conversation_id=`。
7. **Clip音声取得**: 再生時に `GET /clip/{clip_id}/audio`（またはコメント音声 `/comment-audio`）で\*\*サインドURL（text/plain）\*\*を受け取り、実ファイルを取得し再生。

> **注意:** Conversation本体の音声ファイルを直接取得するAPIは現行ドキュメント/コード上明示されていません（Clip経由での再生が前提か、もしくは将来的に追加）。必要ならバックエンド拡張を検討。

---

## 3. データモデル詳細（フィールドマッピング）

ネイティブ側でモデルクラスを定義する際のフィールド対応表です。

### 3.1 Conversation

主なフィールド: `id`, `user_id`, `status`, `inner_status`, `created_at`, `updated_at`, `file_name`, `file_path`, `mime_type`, `available_duration`, `language`, `situation`, `place`, `time`, `location`, `points`。ステータスは Enum: `not_started`, `processing`, `completed`, `failed`。

**編集可能メタ:** `place`, `location` を PATCH `/conversation/{id}` で更新可能。

### 3.2 Clip

主なフィールド: `id`, `conversation_id`, `created_at`, `updated_at`, `file_name`, `mime_type`, `title`, `description`, `comment`, `captions`（start/end/speaker/caption）。保存時は `file_path` とコメント用 `comment_file_path` がストレージに格納され、APIレスポンスはユーザー向けメタ＋キャプションを返します。

### 3.3 Transcript

`captions` は `[timecode, speaker, caption]` の配列。存在しない場合 404。

### 3.4 Analysis

`summary`, `highlights[ {summary, highlight, timecode_start_at, timecode_end_at, favorite} ]`, `insights`（スコア群）, `breakdown`（metadata, sentiment, keywords）。

---

## 4. サインドURLとストレージ取り扱い

音声ファイルはGoogle Cloud Storageに保存され、再生時はバックエンド経由で**署名付き一時URL**を取得します。署名URLの有効期限は現在 **60分** として生成されています（`expiration_minutes = 60`）。クライアントは期限切れ時に再取得するリフレッシュ処理を実装してください。

### 推奨クライアント戦略

* URL取得時に期限（受信時刻 + 60分）を記録。
* 再生開始前に期限チェックし、残<1分なら再取得。
* オフライン再生をサポートしたい場合はURLで直接ストリームするのではなくローカルキャッシュにダウンロード → 保存（ユーザー承諾＆暗号化検討）。

---

## 5. ネイティブ画面設計リファレンス

以下はモバイルUI設計時に押さえておきたい表示要素と推奨レイアウトです。Web版はNext.js + shadcn/ui + Radix UIコンポーネント群を利用しているので、UIトーン＆マナーを合わせる場合の参考にしてください。

### 5.1 録音一覧（Conversation List Screen）

表示項目候補:

* サムネイル（音声アイコン or 最後に再生した位置）
* タイトル（`file_name` またはユーザー編集タイトル未実装なら日付で代用）
* 作成日時 `created_at`
* ステータスバッジ（Processing中はスピナー、Failedは警告）
* 言語 / 所在地などメタの一部（`language`, `place`など）
* 利用ポイント（任意）
  バックエンドから30件降順取得できるため、ページング／追加読み込み設計。

### 5.2 録音詳細 & 再生画面（Conversation Detail / Player）

上部にタイトル・メタ、中央にプレーヤー（再生/一時停止・シークバー・経過/残り時間）。Conversation自体の音声URLがAPI未提供のため、**全体を再生したい場合は選択範囲を自動クリップ化するバックエンド拡張、またはアップロード直後にクライアント保持URLで再生**等のワークアラウンドが必要。現在は主にClip再生が確実な手段。

### 5.3 ハイライト（Clip）一覧 / 再生

Conversationに紐づくClipを取得し、リスト表示（タイトル・説明・開始〜終了タイムコード・スピーカー）。タップで `GET /clip/{id}/audio` → サインドURL取得 → 再生。コメント音声が分離されている場合は副ボタン再生（吹き出しアイコン）で `/comment-audio` を呼ぶ。

### 5.4 トランスクリプト同期表示

Transcriptを行毎に表示し、再生位置とタイムコード同期（Clip再生時は該当範囲をハイライト）。Transcript取得API提供／未存在時はエンプティステート表示。

### 5.5 AI分析タブ

会話要約、ハイライト抽出、インサイトスコア、メタ/感情/キーワードなどをタブまたは折りたたみで表示。お気に入り（`favorite`）ハイライトを上位表示するUIも検討。

### 5.6 メタデータ編集UI

`place` / `location` をユーザーが後から編集できる軽量フォームを用意し PATCH 呼び出し。保存後リスト反映。

### 5.7 ポイント表示（任意）

Conversationごとのポイント付与やユーザーポイント残高表示機能を実装する場合、Point API群が利用可能（`GET /point/get`, `/point/transaction/list`）。リテンション機能としてゲーミフィケーションに活用できます。

---

## 6. 再生まわり技術Tips（iOS / Android共通観点）

| テーマ        | 推奨                                           | 補足             |
| ---------- | -------------------------------------------- | -------------- |
| 形式         | サインドURL経由HTTP(S)音声                           | 取得後キャッシュで期限緩和  |
| 期限管理       | 60分で期限切れ前再取得                                 | ストレージ仕様に依存     |
| キャッシュ      | OS標準ディスクキャッシュ + メタDB                         | ユーザー削除機能       |
| フォーマット変換   | 可能ならバックエンド側でmp3/ogg統一                        | クライアント側デコード簡素化 |
| バックグラウンド再生 | OSメディアセッション統合                                | ロック画面制御        |
| シーク        | 事前にContent-Length取得 / Rangeリクエスト             | GCS署名URL対応     |
| 速度調整       | AVPlayer(rate) / ExoPlayer(setPlaybackSpeed) | 教育系用途          |

根拠: Clip音声がGCSに格納されサインドURLで配布される設計、およびサインドURL60分期限。

---

## 7. 処理ステータス & ポーリング設計

アップロード後すぐにTranscript/Analysis/Clipが利用可能とは限りません。以下の状態遷移とポーリングを考慮してください。

**Conversation.status**: `not_started` → `processing` → `completed` | `failed`。

**Prefectジョブ**: `/conversation/{id}/job` で外部ワークフローの開始/終了・成功/失敗を取得。ジョブが未登録の場合404。

> 推奨: アップロード後は指数バックオフでポーリング（例: 5s, 10s, 20s, 30s間隔）し、`status === completed` でTranscript/Analysis/Clip取得ボタンを有効化。

---

## 8. エラーハンドリング / バリデーション

以下はバックエンドで返り得る代表的なバリデーション・エラー条件。ネイティブ側で事前チェック/ユーザーフィードバックに反映するとUX向上。

| ケース           | バックエンド条件                                      | クライアント事前チェック | 備考 |
| ------------- | --------------------------------------------- | ------------ | -- |
| ファイル形式        | `content_type` が `audio/` で始まらないと 400         | 拡張子/MIME判定   |    |
| サイズ超過         | >300MB で 400                                  | サイズ確認        |    |
| サーバ容量         | `check_conversation_limit_exceeded()` 失敗で 503 | リトライ/ユーザ通知   |    |
| ストレージ署名失敗     | generate\_signed\_url 例外で 500                 | 再試行          |    |
| Transcript未生成 | 404                                           | 後で再試行        |    |
| Analysis未生成   | 404                                           | 後で再試行        |    |

---

## 9. CORSと開発環境

バックエンドFastAPIはCORS全許可（`allow_origins=["*"]` など）。Webからは問題ないが、ネイティブは通常直接影響なし。開発時ローカルでの疎通確認に有用。

---

## 10. フロントエンド（Web版）依存関係から推測できるUIパターン

`frontend/package.json` を見ると、Radix UI / shadcn-ui / Framer Motion / Recharts 等を利用しています。モバイルネイティブで同等体験を再現する場合、以下のコンポーネント群に対応するUIライブラリを選定すると移植が容易です（例: React Native Paper, NativeBase, Radix風のアクセシビリティ対応）。

---

## 11. サンプルAPI呼び出し（cURL）

以下は開発時の疎通確認スニペット（ベースURLは環境に合わせて変更）。

```bash
# Conversation一覧
curl -H "Authorization: Bearer $TOKEN" \
     -H "Oto-User-Id: $USER_ID" \
     "$API_BASE/conversation/list"

# Clip一覧（特定Conversation）
curl -H "Authorization: Bearer $TOKEN" \
     -H "Oto-User-Id: $USER_ID" \
     "$API_BASE/clip/list?conversation_id=$CID"

# Clip音声URL取得
curl -H "Authorization: Bearer $TOKEN" \
     -H "Oto-User-Id: $USER_ID" \
     "$API_BASE/clip/$CLIP_ID/audio"
```

エンティティごとの全パラメータは公式APIドキュメント参照。

---

## 12. モバイルクライアント用 型定義例（Type-ish擬似コード）

```ts
export type ConversationStatus = 'not_started'|'processing'|'completed'|'failed';

export interface ConversationDTO {
  id: string;
  created_at: string; // ISO8601
  updated_at: string;
  status: ConversationStatus;
  file_name: string;
  mime_type: string;
  available_duration?: string;
  language?: string;
  situation?: string;
  place?: string;
  time?: string;
  location?: string;
  points?: number;
}

export interface ClipCaptionDTO {
  timecode_start: string;
  timecode_end: string;
  speaker: string;
  caption: string;
}

export interface ClipDTO {
  id: string;
  conversation_id: string;
  file_name: string;
  mime_type: string;
  title: string;
  description: string;
  comment: string;
  captions: ClipCaptionDTO[];
}
```

フィールド出典: Conversation/ClipモデルおよびClipレスポンス仕様。

---

## 13. Native実装チェックリスト

* [ ] APIクライアント層（認証ヘッダ自動付与）
* [ ] Conversation一覧 + 詳細（ステータス表示）
* [ ] Prefectジョブポーリング（解析待ちUI）
* [ ] Clip一覧 + 音声再生（サインドURL取得 / キャッシュ / 期限再取得）
* [ ] コメント音声再生
* [ ] Transcript表示 + 再生位置同期
* [ ] Analysisタブ（サマリ/ハイライト/スコア）
* [ ] メタ編集（place/location）
* [ ] エラーハンドリング（形式/サイズ/期限切れ/404）
* [ ] ポイント残高（任意）
* [ ] オフラインキャッシュ設定
  各チェック項目の根拠は前述セクション参照。

---

## 14. よくある質問（想定）

**Q. Conversationそのもののフル音声を再生したいがAPIは?** → 現行コードに明示的エンドポイントなし。`file_path` はDBに保持されているので、Clipと同様のサインドURL発行エンドポイント追加が最短。

**Q. サインドURLの期限は?** → 現状60分。期限切れ時は再取得。

**Q. 最大アップロードサイズは?** → 300MB。事前チェック推奨。

---
