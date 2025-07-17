import { ClipDTO } from "@/types/clip";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  clip: ClipDTO;
  onPress?: () => void;
}

export default function ClipCard({ clip, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.playButton}>
        <Ionicons name="play" size={24} color="#fff" />
      </View>
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
