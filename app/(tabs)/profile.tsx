import { View, Text, Button } from 'react-native';
import { usePrivy } from '@privy-io/expo';

export default function ProfileScreen() {
  const { user, logout } = usePrivy();
  if (!user) return null;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <Text>Logged in as {user.id}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
