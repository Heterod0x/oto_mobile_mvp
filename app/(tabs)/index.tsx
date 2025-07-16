import { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

export default function HomeScreen() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const [uri, setUri] = useState<string | null>(null);
  const player = useAudioPlayer(uri ? { uri } : null);

  useEffect(() => {
    requestRecordingPermissionsAsync().catch(() => {
      // ignore permission errors for now
    });
  }, []);

  useEffect(() => {
    if (recorderState.url) {
      setUri(recorderState.url);
      player.play();
    }
  }, [recorderState.url, player]);

  const toggleRecording = async () => {
    if (recorderState.isRecording) {
      await recorder.stop();
    } else {
      await recorder.prepareToRecordAsync();
      recorder.record();
      setUri(null);
    }
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}
    >
      <Text>Home Screen</Text>
      <Button
        title={recorderState.isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={toggleRecording}
      />
    </View>
  );
}
