import useAudioRecorder from "@/hooks/useAudioRecorder";
import { uploadAudio } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { usePrivy } from "@privy-io/expo";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RecordingControls() {
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
  } = useAudioRecorder();
  const { user, getAccessToken } = usePrivy();
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

  // ファイル情報をチェックする関数
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

    // 再生中なら停止
    if (isPlaying) {
      await stopCurrentPlayback();
      return;
    }

    // まずファイル情報をチェック
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

  return (
    <View style={styles.container}>
      {/* Main Recording Button - Fixed Position */}
      <View style={styles.recordingButtonContainer}>
        <TouchableOpacity
          style={[
            styles.recordingButton,
            recording
              ? styles.recordingButtonActive
              : styles.recordingButtonInactive,
          ]}
          onPress={recording ? stopRecording : startRecording}
          activeOpacity={0.8}
        >
          <Ionicons
            name={recording ? "stop" : "mic"}
            size={36}
            color={recording ? "#ffffff" : "#4f46e5"}
          />
        </TouchableOpacity>
      </View>

      {/* Status Section - Fixed Height */}
      <View style={styles.statusSection}>
        {recording ? (
          <View style={styles.recordingStatusContainer}>
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording</Text>
            </View>
            <Text style={styles.durationText}>{formatDuration(duration)}</Text>
          </View>
        ) : (
          <View style={styles.placeholderContainer} />
        )}
      </View>

      {/* Action Buttons Section - Fixed Height */}
      <View style={styles.actionSection}>
        {!recording && lastRecordingUri ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isPlaying ? styles.stopButton : styles.playButton,
              ]}
              onPress={handlePlayLastRecording}
            >
              <Ionicons
                name={isPlaying ? "stop" : "play"}
                size={20}
                color={isPlaying ? "#ffffff" : "#4f46e5"}
              />
              <Text
                style={
                  isPlaying ? styles.stopButtonText : styles.playButtonText
                }
              >
                {isPlaying ? "Stop" : "Play"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.uploadButton]}
              onPress={uploadLastRecording}
              disabled={uploading}
            >
              <Ionicons
                name={uploading ? "cloud-upload-outline" : "cloud-upload"}
                size={20}
                color={uploading ? "#9ca3af" : "#ffffff"}
              />
              <Text style={styles.uploadButtonText}>
                {uploading ? `${uploadProgress}%` : "Upload"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionButtonsPlaceholder} />
        )}
      </View>

      {/* Playback Time Section - Fixed Height */}
      <View style={styles.playbackTimeSection}>
        {!recording && (isPlaying || playbackDuration > 0) ? (
          <Text style={styles.playbackTimeText}>
            {formatDuration(playbackPosition)} /{" "}
            {formatDuration(playbackDuration)}
          </Text>
        ) : (
          <View style={styles.playbackTimePlaceholder} />
        )}
      </View>

      {/* Status Messages Section - Fixed Height */}
      <View style={styles.statusMessageSection}>
        {uploadStatus && (
          <Text
            style={[
              styles.statusText,
              uploadStatus.includes("complete")
                ? styles.statusSuccess
                : styles.statusError,
            ]}
          >
            {uploadStatus}
          </Text>
        )}
      </View>

      {/* Debug Information - For Development Only */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>🔧 Debug Info (Dev Only)</Text>
        <Text style={styles.debugText}>
          Recording URI: {lastRecordingUri ? "✓ Found" : "✗ None"}
        </Text>
        {lastRecordingUri && (
          <Text style={styles.debugText} numberOfLines={2}>
            Path: {lastRecordingUri}
          </Text>
        )}
        {fileInfo && (
          <>
            <Text style={styles.debugText}>
              File exists: {fileInfo.exists ? "✓" : "✗"}
            </Text>
            <Text style={styles.debugText}>
              File size: {fileInfo.size} bytes
            </Text>
          </>
        )}
        {permissionStatus && (
          <Text style={styles.debugText}>{permissionStatus}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  recordingButtonContainer: {
    marginBottom: 0,
    marginTop: 60,
  },
  recordingButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recordingButtonInactive: {
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#4f46e5",
  },
  recordingButtonActive: {
    backgroundColor: "#ef4444",
    borderWidth: 0,
    transform: [{ scale: 0.95 }],
  },
  statusSection: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  recordingStatusContainer: {
    alignItems: "center",
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    marginRight: 8,
  },
  recordingText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  durationText: {
    fontSize: 32,
    fontWeight: "300",
    color: "#1f2937",
    fontFamily: "monospace",
    letterSpacing: 2,
  },
  placeholderContainer: {
    height: 80,
  },
  actionSection: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    width: "100%",
    maxWidth: 300,
  },
  actionButtonsPlaceholder: {
    height: 48,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    height: 48,
    justifyContent: "center",
  },
  playButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#4f46e5",
  },
  playButtonText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#4f46e5",
    fontWeight: "500",
  },
  stopButton: {
    backgroundColor: "#dc2626",
    borderWidth: 1.5,
    borderColor: "#dc2626",
  },
  stopButtonText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  uploadButton: {
    backgroundColor: "#4f46e5",
  },
  uploadButtonText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  playbackTimeSection: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  playbackTimeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4f46e5",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  playbackTimePlaceholder: {
    height: 24,
  },
  statusMessageSection: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    textAlign: "center",
  },
  statusSuccess: {
    color: "#059669",
  },
  statusError: {
    color: "#dc2626",
  },
  debugContainer: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    maxWidth: 300,
  },
  debugTitle: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  debugText: {
    fontSize: 12,
    color: "#64748b",
    fontFamily: "monospace",
    marginBottom: 4,
  },
});
