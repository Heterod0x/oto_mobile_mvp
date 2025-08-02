import { Trend } from "@/types/trend";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TrendCard from "./TrendCard";

interface Props {
  trends: Trend[] | null;
  title: string;
}

export default function TrendList({ trends, title }: Props) {
  if (!trends || trends.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No trend data</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {trends.map((t) => (
          <TrendCard key={t.id} trend={t} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
