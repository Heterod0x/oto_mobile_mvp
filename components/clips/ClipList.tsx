import { ClipListResponse } from "@/types/clip";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import ClipCard from "./ClipCard";

interface Props {
  clips: ClipListResponse;
}

export default function ClipList({ clips }: Props) {
  if (!clips.clips || clips.clips.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No clips available</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {clips.clips.map((clip) => (
          <ClipCard key={clip.id} clip={clip} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
