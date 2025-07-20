import { Microtrend } from "@/types/trend";
import { StyleSheet, Text, View } from "react-native";
import MicrotrendCard from "./MicrotrendCard";

interface Props {
  microtrends: Microtrend[] | null;
}

export default function MicrotrendList({ microtrends }: Props) {
  if (!microtrends || microtrends.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No microtrend data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Emerging Micro-Trends</Text>
      {microtrends.map((t) => (
        <MicrotrendCard key={t.id} microtrend={t} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
