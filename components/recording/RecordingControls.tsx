import useAudioRecorder from "@/hooks/useAudioRecorder";
import { Button, Text, View } from "react-native";

export default function RecordingControls() {
  const {
    recording,
    startRecording,
    stopRecording,
    playLastRecording,
    lastRecordingUri,
    duration,
  } = useAudioRecorder();

  return (
    <View style={{ alignItems: "center", gap: 10 }}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {recording && (
        <View style={{ alignItems: "center" }}>
          <Text>Recording...</Text>
          <Text>Duration: {Math.floor(duration / 1000)}s</Text>
        </View>
      )}
      {!recording && lastRecordingUri && (
        <View style={{ alignItems: "center" }}>
          <Text>Recording saved at: {lastRecordingUri}</Text>
          <Button title="Play Last Recording" onPress={playLastRecording} />
        </View>
      )}
    </View>
  );
}
