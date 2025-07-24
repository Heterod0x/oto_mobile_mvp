import { View, Text, StyleSheet, Button } from 'react-native';
import { PointBalanceResponse, ClaimableAmountResponse } from '@/types/user';

interface Props {
  balance: PointBalanceResponse | null;
  claimable?: ClaimableAmountResponse | null;
  onClaim?: () => void;
  claiming?: boolean;
  error?: string | null;
}

export default function EarningsPanel({ balance, claimable, onClaim, claiming, error }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earnings</Text>
      <Text style={styles.balance}>{balance ? `${balance.points} pts` : '-- pts'}</Text>
      
      {claimable && claimable.amount > 0 && (
        <View style={styles.claimSection}>
          <Text style={styles.claimableLabel}>Available to Claim</Text>
          <Text style={styles.claimableAmount}>{claimable.display_amount} pts</Text>
          {error && (
            <View style={styles.errorSection}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          {onClaim && (
            <Button title="Claim" onPress={onClaim} disabled={claiming} />
          )}
        </View>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  claimSection: {
    alignItems: 'center',
    width: '100%',
  },
  claimableLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  claimableAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  errorSection: {
    backgroundColor: '#FFE6E6',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
});
