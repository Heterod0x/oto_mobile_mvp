# OTO Native App - React Native Expo版

## プロジェクト概要

**OTO Native App**は、既存のWebアプリケーション - OTO MVP(https://github.com/leq6c/otomvp)のfrontendをReact Native Expoでネイティブアプリ化したものです。会話の録音とアップロード、AI分析、トランスクリプション機能を提供する会話分析プラットフォームのモバイル版として開発されます。

### コンセプト
- **"Voice Yields"** - 世界中の会話をデータに変換
- 日常会話を構造化データに変換し、パーソナライズされたサービスを提供
- スピーチAIの訓練データ不足を解決し、グローバルな会話フローをマッピング

## アプリケーションアーキテクチャ

### プラットフォーム
- **フレームワーク**: React Native with Expo
- **言語**: TypeScript
- **認証**: Privy Auth integration
- **API**: 既存のOTO MVP Backend API を使用
- **状態管理**: useState + jotai(global states) + AsyncStorage(persistent) + TanStack Query(api reponse cache)

### バックエンド連携
- **API Base URL**: https://otomvp-api-78nm.onrender.com
- **認証**: Privy access token + Bearer authentication
- **データ形式**: JSON REST API

## 主要機能

### 1. 認証システム
- **Privy認証連携**
  - ウォレット接続対応

### 2. アップロード機能(Nativeではファイル選択ではなくマイクからの直接録音のみ)
- **音声ファイルアップロード**
  - 録音機能（マイクからの直接録音/バックグラウンド録音対応）
  - アップロード進捗表示

- **ファイル管理**
  - アップロード履歴表示
  - 処理ステータス（アップロード中、処理中、完了、エラー）
  - ファイルメタデータ表示

### 3. 分析・解析機能
- **AI分析結果表示**
  - 会話サマリー
  - ハイライト（重要な瞬間の抽出）
  - インサイト（提案、スコアリング）
  - 感情分析
  - 詳細分析データ

- **トランスクリプト機能**
  - 完全な文字起こし表示
  - タイムスタンプ付きセグメント
  - ハイライトとの連携
  - 検索機能
  - エクスポート機能

### 4. プロフィール管理
- **ユーザープロフィール**
  - 基本情報（名前、年齢、国籍）
  - 言語設定（第一言語、第二言語）
  - 興味・関心分野
  - 好みのトピック

- **ポイントシステム**
  - ポイント残高表示
  - 取引履歴
  - ポイント獲得方法の説明

### 5. トレンド・アナリティクス
- **グローバルトレンド**
  - 会話トレンドの可視化
  - マイクロトレンド分析
  - 地域別データ
  - 時系列分析

### 6. クリップ機能
- **会話クリップ管理**
  - 重要な会話部分の切り出し
  - クリップ一覧表示
  - 音声再生機能
  - コメント機能

## API統合

### 使用予定のAPI エンドポイント

#### 認証
- 既存のPrivy認証システムを活用
- トークンリフレッシュ機能

#### コア機能
```
POST /conversation/create     # 音声ファイルアップロード
GET  /conversation/list       # 会話一覧取得
GET  /conversation/{id}       # 個別会話取得
GET  /analysis/{id}          # 分析結果取得
GET  /transcript/{id}        # トランスクリプト取得
```

#### ユーザー管理
```
GET  /user/get               # プロフィール取得
POST /user/update           # プロフィール更新
GET  /point/get             # ポイント残高
```

#### トレンド・クリップ
```
GET  /trend/trends          # トレンド一覧
GET  /clip/list            # クリップ一覧
GET  /clip/{id}            # 個別クリップ
```

## アプリの画面構成

### メイン画面
1. **ホーム**: 録音、アップロード
2. **履歴**: 過去の会話とその処理状況 -> 詳細な分析結果とインサイト
3. **トレンド**: グローバル分析データ
4. **プロフィール**: ユーザープロフィールとポイント情報

### 補助画面
- **ヘルプ**: 使い方、FAQ

## 技術スタック

### フロントエンド
```typescript
React Native Expo

// 主要ライブラリ
- @expo/vector-icons      # アイコン
- expo-av                # 音声録音・再生
```

### 認証・API
```typescript
// Privy認証
@privy-io/expo           # Expo用Privy SDK

// HTTP クライアント
fetch                    # API通信
@tanstack/react-query    # データフェッチング・キャッシュ
```

### 状態管理・UI
```typescript
// 状態管理
jotai                 # 軽量状態管理

// Style
Nativewind            # tailwind for React Native
```

## 開発フェーズ

### Phase 1: 基本機能 (MVP)
- [ ] 認証システム実装
- [ ] 基本ナビゲーション
- [ ] 音声録音
- [ ] アップロード
- [ ] 会話一覧表示

### Phase 2: 分析機能
- [ ] 分析結果表示
- [ ] ハイライト機能
- [ ] 基本プロフィール管理
- [ ] トレンド表示