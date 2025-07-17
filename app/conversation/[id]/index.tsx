import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import useClips from '@/hooks/useClips';
import ClipList from '@/components/clips/ClipList';

export default function ConversationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = Array.isArray(id) ? id[0] : id;
  const { data, loading, error } = useClips(conversationId);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Clips' }} />
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
      {error && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      )}
      {data && <ClipList clips={data} />}
    </View>
  );
}
