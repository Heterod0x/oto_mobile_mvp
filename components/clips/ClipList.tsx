import { FlatList } from 'react-native';
import ClipCard from './ClipCard';
import { ClipDTO } from '@/types/clip';

interface Props {
  clips: ClipDTO[];
}

export default function ClipList({ clips }: Props) {
  return (
    <FlatList
      data={clips}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ClipCard clip={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 16 }}
    />
  );
}
