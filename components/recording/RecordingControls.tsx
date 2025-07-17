import useAudioRecorder from "@/hooks/useAudioRecorder";
import { uploadAudio } from "@/services/api";
import { usePrivy } from "@privy-io/expo";
import { useState } from "react";
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
  const { user, getAccessToken } = usePrivy();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const uploadLastRecording = async () => {
    if (!lastRecordingUri || !user) return;
    setUploading(true);
    setUploadStatus(null);
    try {
      const token = (await getAccessToken()) || "";
      await uploadAudio(lastRecordingUri, user.id, token, setUploadProgress);
      setUploadStatus("Upload complete");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setUploadStatus(message);
    } finally {
      setUploading(false);
    }
  };

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
          <Button
            title={uploading ? `Uploading ${uploadProgress}%` : "Upload Recording"}
            onPress={uploadLastRecording}
            disabled={uploading}
          />
          {uploadStatus && <Text>{uploadStatus}</Text>}
        </View>
      )}
    </View>
  );
}
