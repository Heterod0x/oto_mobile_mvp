import { FlatList, View, Text, ActivityIndicator } from "react-native";
import useConversations from "@/hooks/useConversations";
import ConversationItem from "@/components/history/ConversationItem";

export default function HistoryScreen() {
  const { data, loading, error } = useConversations();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data || []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ConversationItem conversation={item} />}
      ListEmptyComponent={
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text>No conversations yet.</Text>
        </View>
      }
    />
  );
}
