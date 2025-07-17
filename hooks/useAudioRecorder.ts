import notifee, { AndroidImportance } from "@notifee/react-native";
import { Audio, InterruptionModeIOS } from "expo-av";
import { useState } from "react";

export default function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [lastRecordingUri, setLastRecordingUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);

  // 録音開始
  const startRecording = async () => {
    // マイク権限リクエスト
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) return;

    // iOS バックグラウンド設定含む Audio モード
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    });

    // Expo-AV で録音オブジェクト生成
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    recording.setOnRecordingStatusUpdate((status) => {
      if (status.isRecording) {
        setDuration(status.durationMillis);
      }
    });

    // 通知チャンネル作成（低重要度で十分）
    const channelId = await notifee.createChannel({
      id: "recording",
      name: "録音サービス",
      importance: AndroidImportance.LOW,
    });

    // フォアグラウンドサービス通知を表示し、サービスを起動
    await notifee.displayNotification({
      title: "録音中",
      body: "バックグラウンドでも録音を続けています",
      android: {
        channelId,
        asForegroundService: true, // フォアグラウンドサービス通知を指定 :contentReference[oaicite:1]{index=1}
        ongoing: true, // ユーザー操作で消せないように
        pressAction: { id: "default" }, // タップでアプリ起動
      },
    });

    setRecording(recording);
  };

  // 録音停止
  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    setLastRecordingUri(recording.getURI()!);
    setRecording(null);
    setDuration(0);

    // フォアグラウンドサービス停止 → Promise が解決されて通知も消える :contentReference[oaicite:2]{index=2}
    await notifee.stopForegroundService();
  };

  // 録音再生
  const playLastRecording = async () => {
    if (!lastRecordingUri) return;
    const { sound } = await Audio.Sound.createAsync({ uri: lastRecordingUri });
    sound.setOnPlaybackStatusUpdate((s) => {
      if (s.isLoaded && s.didJustFinish) sound.unloadAsync();
    });
    await sound.playAsync();
  };

  return {
    recording,
    startRecording,
    stopRecording,
    playLastRecording,
    lastRecordingUri,
    duration,
  };
}
