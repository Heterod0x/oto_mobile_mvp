import { View, Button, StyleSheet } from 'react-native';
import { usePrivy } from '@privy-io/expo';

export default function AccountActions() {
  const { logout } = usePrivy();

  const handleDelete = () => {
    // TODO: implement account deletion flow
  };

  return (
    <View style={styles.container}>
      <Button title="ログアウト" onPress={logout} />
      <Button title="アカウント削除" onPress={handleDelete} color="#d9534f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
});
