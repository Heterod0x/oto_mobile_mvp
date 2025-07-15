import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useLogin } from '@privy-io/expo/ui';

export default function LoginScreen() {
  const { login } = useLogin();
  const [error, setError] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Button
        title="Login with Email"
        onPress={() =>
          login({ loginMethods: ['email'] })
            .catch((err) => setError(String(err?.message ?? err)))
        }
      />
      {error ? <Text style={{ color: 'red' }}>Error: {error}</Text> : null}
    </View>
  );
}
