import { View, Button, StyleSheet } from 'react-native';
import { usePrivy } from '@privy-io/expo';

export default function AccountActions() {
  const { logout } = usePrivy();

  return (
    <View style={styles.container}>
      <Button title="ログアウト" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
});
