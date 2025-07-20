import { Microtrend } from '@/types/trend';
import { View, Text, StyleSheet } from 'react-native';
import TrendCard from './TrendCard';

interface Props {
  microtrends: Microtrend[] | null;
}

export default function MicrotrendList({ microtrends }: Props) {
  if (!microtrends || microtrends.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No microtrend data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Microtrends</Text>
      {microtrends.map((t) => (
        <TrendCard key={t.id} trend={t as any} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
