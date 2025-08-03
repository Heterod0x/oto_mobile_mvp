import MicrotrendList from "@/components/trends/MicrotrendList";
import TrendList from "@/components/trends/TrendList";
import useMicrotrends from "@/hooks/useMicrotrends";
import useTrends from "@/hooks/useTrends";
import { ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text, Heading } from "@/components/ui/text";

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
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center items-center bg-background-0">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text size="lg" className="text-typography-600 mt-4">Loading trends...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center items-center bg-background-0">
          <Text size="lg" className="text-error-600">Failed to load trends</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView 
        className="flex-1 bg-background-0"
        showsVerticalScrollIndicator={false}
      >
        <Box className="px-5 py-6 pt-24">
          <Box className="mb-8">
            <Heading size="2xl" className="text-typography-900 mb-2">Trends</Heading>
            <Text size="md" className="text-typography-600">
              Discover what&apos;s trending in conversations
            </Text>
          </Box>
          
          <TrendList trends={trends} title="Global Conversation Trends" />
          <MicrotrendList microtrends={microtrends} />
          <Box className="h-20"/>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
