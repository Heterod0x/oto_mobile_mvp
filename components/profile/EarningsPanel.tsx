import { View, Text, StyleSheet } from 'react-native';
import { PointBalanceResponse } from '@/types/point';

interface Props {
  balance: PointBalanceResponse | null;
  loading: boolean;
}

export default function EarningsPanel({ balance, loading }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.balance}>
        {loading ? '--' : `${balance?.points ?? '--'} pts`}
      </Text>
      <Text style={styles.caption}>ご利用可能ポイント</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  balance: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  caption: {
    fontSize: 12,
    color: '#666',
  },
});
