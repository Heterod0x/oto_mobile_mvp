import { Microtrend, Trend } from "@/types/trend";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  trend: Trend | Microtrend;
}

const toPercent = (v: number) => `${Math.round(v * 100)}%`;

export default function TrendCard({ trend }: Props) {
  const {
    title,
    description,
    volume,
    overall_positive_sentiment,
    overall_negative_sentiment,
  } = trend;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && (
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
      )}
      <Text style={styles.volume}>{`Popularity: ${toPercent(
        volume ?? 0
      )}`}</Text>
      {overall_positive_sentiment !== null &&
        overall_negative_sentiment !== null && (
          <Text style={styles.sentiment}>{`Sentiment +${toPercent(
            overall_positive_sentiment
          )} / -${toPercent(overall_negative_sentiment)}`}</Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginLeft: 0,
    marginRight: 12,
    width: 260,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  volume: {
    fontSize: 13,
    color: "#333",
  },
  sentiment: {
    fontSize: 13,
    color: "#333",
  },
});
