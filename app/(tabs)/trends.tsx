import MicrotrendList from "@/components/trends/MicrotrendList";
import TrendList from "@/components/trends/TrendList";
import useMicrotrends from "@/hooks/useMicrotrends";
import useTrends from "@/hooks/useTrends";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function TrendsScreen() {
  const {
    data: trends,
    loading: loadingTrends,
    error: errorTrends,
  } = useTrends();
  const {
    data: microtrends,
    loading: loadingMicro,
    error: errorMicro,
  } = useMicrotrends();

  const isLoading = loadingTrends || loadingMicro;
  const error = errorTrends || errorMicro;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 8 }}>Failed to load trends</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <TrendList trends={trends} title="Global Conversation Trends" />
      <MicrotrendList microtrends={microtrends} />
    </ScrollView>
  );
}
