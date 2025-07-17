import { View, Button, Text } from 'react-native';
import useAudioRecorder from '@/hooks/useAudioRecorder';

export default function RecordingControls() {
  const { recording, startRecording, stopRecording } = useAudioRecorder();

  return (
    <View style={{ alignItems: 'center', gap: 10 }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recording && <Text>Recording...</Text>}
    </View>
  );
}
