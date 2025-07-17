import { useState } from 'react';
import { Audio, InterruptionModeIOS } from 'expo-av';
import notifee from '@notifee/react-native';

export default function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [lastRecordingUri, setLastRecordingUri] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      const channelId = await notifee.createChannel({
        id: 'recording',
        name: 'Recording',
      });

      await notifee.displayNotification({
        title: 'Android audio background recording',
        body: 'recording...',
        android: {
          channelId,
          asForegroundService: true,
        },
      });

      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      setLastRecordingUri(recording.getURI() ?? null);
      setRecording(null);
      await notifee.stopForegroundService();
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playLastRecording = async () => {
    try {
      if (!lastRecordingUri) return;
      const { sound } = await Audio.Sound.createAsync({ uri: lastRecordingUri });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
      await sound.playAsync();
    } catch (err) {
      console.error('Failed to play recording', err);
    }
  };

  return { recording, startRecording, stopRecording, playLastRecording, lastRecordingUri };
}
