import { ClipDTO } from "@/types/clip";
import { Ionicons } from "@expo/vector-icons";
import { usePrivy } from "@privy-io/expo";
import { Audio } from "expo-av";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { fetchClipAudioUrl } from "@/services/api";

interface Props {
  clip: ClipDTO;
  onPress?: () => void;
}

export default function ClipCard({ clip, onPress }: Props) {
  const { user, getAccessToken } = usePrivy();
  const soundRef = useRef<Audio.Sound | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    if (!user || loading) return;
    setLoading(true);
    try {
      const token = (await getAccessToken()) || '';
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
        }
      });
      soundRef.current = sound;
      await sound.playAsync();
    } catch (err) {
      console.error('Failed to play clip', err);
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
          <Ionicons name="play" size={24} color="#fff" />
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
    marginHorizontal: 12,
    width: 300,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 4,
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
