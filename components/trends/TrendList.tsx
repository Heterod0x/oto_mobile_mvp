import { Trend } from '@/types/trend';
import { View, Text, StyleSheet } from 'react-native';
import TrendCard from './TrendCard';

interface Props {
  trends: Trend[] | null;
  title: string;
}

export default function TrendList({ trends, title }: Props) {
  if (!trends || trends.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No trend data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {trends.map((t) => (
        <TrendCard key={t.id} trend={t} />
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
