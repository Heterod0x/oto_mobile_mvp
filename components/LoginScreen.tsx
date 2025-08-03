import { useLogin } from "@privy-io/expo/ui";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text, Heading } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/lib/oto-auth";

export default function LoginScreen() {
  const { login } = useLogin();
  const [error, setError] = useState("");
  const { isReady } = useAuth();

  if (!isReady)
    return (
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center items-center bg-background-0">
          <Text size="lg" className="text-typography-600">Loading...</Text>
        </Box>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 justify-center items-center px-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        {/* Logo/Brand Section */}
        <Box className="items-center mb-12">
          <Box className="w-20 h-20 bg-primary-600 rounded-full items-center justify-center mb-6 shadow-lg">
            <Ionicons name="mic" size={32} color="white" />
          </Box>
          <Heading size="4xl" className="text-primary-900 mb-2">OTO</Heading>
          <Text size="lg" className="text-typography-600 text-center">
            Record, Analyze & Share Conversations
          </Text>
        </Box>

        {/* Login Section */}
        <Box className="w-full max-w-sm">
          <Button
            size="lg"
            className="w-full mb-4 shadow-md"
            onPress={() =>
              login({ loginMethods: ["email"] }).catch((err) =>
                setError(String(err?.message ?? err))
              )
            }
          >
            <Ionicons name="mail" size={20} color="white" style={{ marginRight: 8 }} />
            <ButtonText size="lg">Login with Email</ButtonText>
          </Button>

          {error && (
            <Box className="bg-error-50 border border-error-200 rounded-lg p-4 mt-4">
              <Text className="text-error-700 text-center">
                {error}
              </Text>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box className="absolute bottom-8 items-center">
          <Text size="sm" className="text-typography-500">
            Secure authentication powered by Privy
          </Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
