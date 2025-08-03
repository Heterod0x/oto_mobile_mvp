import useAudioRecorder from "@/hooks/useAudioRecorder";
import { uploadAudio } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/lib/oto-auth";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";

export interface RecordingControlsProps {
  isRecording: boolean;
  setRecording: (recording: boolean) => void;
}

export default function RecordingControls({ isRecording, setRecording }: RecordingControlsProps) {
  const {
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
  } = useAudioRecorder();
  const { user, getAccessToken } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    size: number;
    exists: boolean;
  } | null>(null);

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

  const checkFileInfo = async (uri: string) => {
    try {
      const info = await FileSystem.getInfoAsync(uri);
      setFileInfo({
        size: info.exists ? info.size || 0 : 0,
        exists: info.exists,
      });
      return info;
    } catch {
      setFileInfo({ size: 0, exists: false });
      return null;
    }
  };

  const handlePlayLastRecording = async () => {
    if (!lastRecordingUri) return;

    if (isPlaying) {
      await stopCurrentPlayback();
      return;
    }

    const info = await checkFileInfo(lastRecordingUri);
    if (!info?.exists || info.size === 0) return;

    try {
      await playLastRecording();
    } catch (error) {
      console.error("再生エラー:", error);
    }
  };

  const formatDuration = (durationMs: number) => {
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    setRecording(true);
    startRecording();
  };

  const handleStopRecording = () => {
    setRecording(false);
    stopRecording();
  };

  const handleDiscardRecording = () => {
    setRecording(false);
    setLastRecordingUri(null);
  };

  return (
    <Box className="items-center justify-center w-full min-h-80 m-4">
      {/* Main Recording Button */}
      <Box className="mb-0 mt-16">
        <TouchableOpacity
          className={`w-24 h-24 rounded-full justify-center items-center shadow-lg ${
            recording
              ? "bg-error-600 scale-95"
              : "bg-background-0 border-3 border-primary-600"
          }`}
          onPress={recording ? handleStopRecording : handleStartRecording}
          activeOpacity={0.8}
        >
          <Ionicons
            name={recording ? "stop" : "mic"}
            size={36}
            color={recording ? "#ffffff" : "#4f46e5"}
          />
        </TouchableOpacity>
      </Box>

      {/* Status Section */}
      <Box className="h-10 mt-2 justify-center items-center w-full">
        {recording ? (
          <Box className="items-center">
            <Text 
              size="2xl" 
              weight="light" 
              className="text-typography-900 font-mono tracking-wider"
            >
              {formatDuration(duration)}
            </Text>
          </Box>
        ) : (
          <Box className="h-10" />
        )}
      </Box>

      {/* Action Buttons Section */}
      {lastRecordingUri && <Box className="h-10 justify-center items-center w-full mb-4">
        {!recording && lastRecordingUri ? (
          <Box className="flex-row justify-center gap-4 w-full max-w-xs">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onPress={handleDiscardRecording}
            >
              <Ionicons
                name="trash"
                size={20}
                color="#9ca3af"
                style={{ marginRight: 6 }}
              />
              <ButtonText variant="outline">
                Discard
              </ButtonText>
            </Button>

            <Button
              size="md"
              className="flex-1"
              onPress={uploadLastRecording}
              disabled={uploading}
            >
              <Ionicons
                name={uploading ? "cloud-upload-outline" : "cloud-upload"}
                size={20}
                color={uploading ? "#9ca3af" : "#ffffff"}
                style={{ marginRight: 6 }}
              />
              <ButtonText>
                {uploading ? `${uploadProgress}%` : "Contribute"}
              </ButtonText>
            </Button>
          </Box>
        ) : (
          <Box className="h-10" />
        )}
      </Box>}

      {/* Playback Time Section */}
      <Box className="h-8">
        {!recording && (isPlaying || playbackDuration > 0) ? (
          <Text 
            size="lg" 
            weight="medium" 
            className="text-primary-600 font-mono tracking-wide"
          >
            {formatDuration(playbackPosition)} / {formatDuration(playbackDuration)}
          </Text>
        ) : (
          <Box className="h-8" />
        )}
      </Box>

      {/* Status Messages Section */}
      {uploadStatus && <Box className="h-8 justify-center items-center w-full mb-4">
        {uploadStatus && (
          <Card variant="outline" size="sm" className="px-4 py-2">
            <CardBody>
              <Text 
                size="sm" 
                className={`text-center ${
                  uploadStatus.includes("complete") 
                    ? "text-success-700" 
                    : "text-error-700"
                }`}
              >
                {uploadStatus}
              </Text>
            </CardBody>
          </Card>
        )}
      </Box>}

    </Box>
  );
}
