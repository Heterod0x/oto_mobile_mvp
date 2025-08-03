import { View, Button, Text } from 'react-native';
import { useAuth } from '@/lib/oto-auth';

export default function UserScreen() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Text>Logged in as {user.id}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
