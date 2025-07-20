import { View, Text, StyleSheet } from 'react-native';
import { PointBalanceResponse } from '@/types/user';

interface Props {
  balance: PointBalanceResponse | null;
}

export default function EarningsPanel({ balance }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>{balance ? `${balance.points} pts` : '-- pts'}</Text>
      <Text style={styles.caption}>Earning</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    color: '#666',
  },
});
