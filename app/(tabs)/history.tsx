import ConversationItem from "@/components/history/ConversationItem";
import useConversations from "@/hooks/useConversations";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, FlatList, SafeAreaView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text, Heading } from "@/components/ui/text";

export default function HistoryScreen() {
  const { data, loading, error } = useConversations();
  const router = useRouter();

  const handlePress = (item: any) => {
    if (item.status === "failed") {
      Alert.alert("Error", "This file is in an error state.");
      return;
    }
    router.push(`/conversation/${item.id}`);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center items-center bg-background-0">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text size="lg" className="text-typography-600 mt-4">Loading conversations...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center items-center bg-background-0">
          <Text size="lg" className="text-error-600">{error}</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 bg-background-0">
        <Box className="px-5 py-6 pt-24">
          <Heading size="2xl" className="text-typography-900 mb-2">History</Heading>
          <Text size="md" className="text-typography-600">
            Your uploaded conversations and recordings
          </Text>
        </Box>
        
        <FlatList
          data={data || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationItem
              conversation={item}
              onPress={() => handlePress(item)}
            />
          )}
          ListEmptyComponent={
            <Box className="items-center mt-20 px-8">
              <Box className="w-16 h-16 bg-background-100 rounded-full items-center justify-center mb-4">
                <Text size="2xl">📁</Text>
              </Box>
              <Text size="lg" weight="medium" className="text-typography-700 mb-2 text-center">
                No conversations yet
              </Text>
              <Text size="md" className="text-typography-500 text-center">
                Upload your first recording to get started with conversation analysis
              </Text>
            </Box>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            flexGrow: 1,
            paddingTop: 16,
            paddingBottom: 20
          }}
        />
        <Box className="h-20"/>
      </Box>
    </SafeAreaView>
  );
}
