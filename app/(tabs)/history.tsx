import ConversationItem from "@/components/history/ConversationItem";
import useConversations from "@/hooks/useConversations";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";

export default function HistoryScreen() {
  const { data, loading, error } = useConversations();
  const router = useRouter();

  const handlePress = (item: any) => {
    if (item.status === "failed") {
      Alert.alert("Error", "このファイルはエラー状態です。");
      return;
    }
    router.push(`/conversation/${item.id}`);
  };

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
      renderItem={({ item }) => (
        <ConversationItem
          conversation={item}
          onPress={() => handlePress(item)}
        />
      )}
      ListEmptyComponent={
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text>No uploaded files yet.</Text>
        </View>
      }
    />
  );
}
