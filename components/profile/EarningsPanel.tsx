import { View, Text, StyleSheet, Button } from 'react-native';
import { PointBalanceResponse, ClaimableAmountResponse } from '@/types/user';

interface Props {
  balance: PointBalanceResponse | null;
  claimable?: ClaimableAmountResponse | null;
  onClaim?: () => void;
  claiming?: boolean;
}

export default function EarningsPanel({ balance, claimable, onClaim, claiming }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>{balance ? `${balance.points} pts` : '-- pts'}</Text>
      <Text style={styles.caption}>Earning</Text>
      {claimable && claimable.amount > 0 && onClaim && (
        <Button title={`Claim ${claimable.display_amount}`} onPress={onClaim} disabled={claiming} />
      )}
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
