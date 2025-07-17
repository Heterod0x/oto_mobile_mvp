import ClipList from "@/components/clips/ClipList";
import ClipHeader from "@/components/clips/ClipHeader";
import useClips from "@/hooks/useClips";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

export default function ConversationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = Array.isArray(id) ? id[0] : id;
  const { data, loading, error } = useClips(conversationId);

  const handleCommentaryToggle = (enabled: boolean) => {
    // TODO: Implement commentary clip filtering
    console.log('Commentary toggle:', enabled);
  };

  const handleMusicToggle = (enabled: boolean) => {
    // TODO: Implement music clip filtering
    console.log('Music toggle:', enabled);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Conversation", headerShown: false }} />
      
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      
      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {data && (
        <>
          <ClipHeader 
            onCommentaryToggle={handleCommentaryToggle}
            onMusicToggle={handleMusicToggle}
          />
          <ClipList clips={data} />
          <View style={styles.futureContent}>
            <Text style={styles.placeholderText}>
              Future content will be added here
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
  futureContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
