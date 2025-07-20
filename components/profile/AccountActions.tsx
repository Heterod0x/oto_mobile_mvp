import { View, Button, StyleSheet } from 'react-native';
import { usePrivy } from '@privy-io/expo';

export default function AccountActions() {
  const { logout } = usePrivy();

  return (
    <View style={styles.footer}>
      <Button title="ログアウト" onPress={logout} />
      {/* TODO: account deletion flow */}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 16,
    gap: 8,
  },
});
