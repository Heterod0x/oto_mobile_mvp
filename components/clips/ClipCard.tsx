import { fetchClipAudioUrl } from "@/services/api";
import { ClipDTO } from "@/types/clip";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/lib/oto-auth";
import { Audio } from "expo-av";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  clip: ClipDTO;
  onPress?: () => void;
}

export default function ClipCard({ clip, onPress }: Props) {
  const { user, getAccessToken } = useAuth();
  const soundRef = useRef<Audio.Sound | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (!user || loading) return;
    // If already playing, stop playback
    if (soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlaying(false);
        return;
      }
    }

    setLoading(true);
    try {
      const token = (await getAccessToken()) || "";
      const url = await fetchClipAudioUrl(clip.id, user.id, token);
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
          setIsPlaying(false);
        }
      });
      soundRef.current = sound;
      await sound.playAsync();
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to play clip", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        onPress={handlePlay}
        style={styles.playButton}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#fff"
          />
        )}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text numberOfLines={3} style={styles.description}>
          {clip.description || clip.title}
        </Text>
        {clip.captions && clip.captions[0] && (
          <Text numberOfLines={1} style={styles.snippet}>
            {clip.captions[0].caption}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 4,
    paddingLeft: 2,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginBottom: 8,
    fontWeight: "400",
  },
  snippet: {
    fontSize: 13,
    lineHeight: 18,
    color: "#666",
    fontStyle: "italic",
  },
});
