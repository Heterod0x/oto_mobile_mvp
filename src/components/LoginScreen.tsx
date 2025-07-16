import { usePrivy } from "@privy-io/expo";
import { useLogin } from "@privy-io/expo/ui";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function LoginScreen() {
  const { login } = useLogin();
  const [error, setError] = useState("");
  const { isReady } = usePrivy();
  if (!isReady)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Button
        title="Login with Email"
        onPress={() =>
          login({ loginMethods: ["email"] }).catch((err) =>
            setError(String(err?.message ?? err))
          )
        }
      />
      {error ? <Text style={{ color: "red" }}>Error: {error}</Text> : null}
    </View>
  );
}
