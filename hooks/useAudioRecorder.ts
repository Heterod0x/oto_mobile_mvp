import notifee, { AndroidImportance } from "@notifee/react-native";
import { Audio, InterruptionModeIOS } from "expo-av";
import { useState } from "react";

export default function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [lastRecordingUri, setLastRecordingUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [permissionStatus, setPermissionStatus] = useState<string>("");
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackPosition, setPlaybackPosition] = useState<number>(0);
  const [playbackDuration, setPlaybackDuration] = useState<number>(0);

  // 録音開始
  const startRecording = async () => {
    try {
      // マイク権限リクエスト
      const { granted, status } = await Audio.requestPermissionsAsync();
      setPermissionStatus(`Permission: ${status}, Granted: ${granted}`);
      if (!granted) {
        console.log("録音権限が拒否されました");
        return;
      }

      // iOS バックグラウンド設定含む Audio モード
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      });

      // Expo-AV で録音オブジェクト生成 - エミュレーター対応のより確実な設定
      const recordingOptions = {
        android: {
          extension: ".m4a",
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: "audio/webm;codecs=opus",
          bitsPerSecond: 128000,
        },
      };

      const { recording } = await Audio.Recording.createAsync(recordingOptions);
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
      console.log("録音開始成功");
    } catch (error) {
      console.error("録音開始エラー:", error);
      setPermissionStatus(
        `エラー: ${error instanceof Error ? error.message : "不明なエラー"}`
      );
    }
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

  // 現在の再生を停止
  const stopCurrentPlayback = async () => {
    if (currentSound) {
      try {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
      } catch (error) {
        console.log("既存の音声停止中にエラー:", error);
      }
      setCurrentSound(null);
      setIsPlaying(false);
      setPlaybackPosition(0);
    }
  };

  // 録音再生
  const playLastRecording = async () => {
    if (!lastRecordingUri) return;

    // 既に再生中なら停止
    if (isPlaying && currentSound) {
      await stopCurrentPlayback();
      return;
    }

    // 既存の音声があれば停止
    await stopCurrentPlayback();

    try {
      setIsPlaying(true);
      const { sound } = await Audio.Sound.createAsync({
        uri: lastRecordingUri,
      });
      setCurrentSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPlaybackPosition(status.positionMillis || 0);
          setPlaybackDuration(status.durationMillis || 0);
          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentSound(null);
            setPlaybackPosition(0);
            sound.unloadAsync();
          }
        }
      });

      await sound.playAsync();
    } catch (error) {
      console.error("再生エラー:", error);
      setIsPlaying(false);
      setCurrentSound(null);
      setPlaybackPosition(0);
      throw error;
    }
  };

  return {
    recording,
    startRecording,
    stopRecording,
    playLastRecording,
    stopCurrentPlayback,
    lastRecordingUri,
    duration,
    permissionStatus,
    isPlaying,
    playbackPosition,
    playbackDuration,
    setLastRecordingUri,
  };
}
