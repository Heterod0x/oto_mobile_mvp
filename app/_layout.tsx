import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider } from "@/lib/oto-auth";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  if (!fontsLoaded) return null;
  return (
    <GluestackUIProvider mode="light">
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <PrivyProvider
        appId={Constants.expoConfig?.extra?.privyAppId}
        clientId={Constants.expoConfig?.extra?.privyClientId}
        config={{
          embeddedWallets: {
            solana: { createOnLogin: "all-users" },
          },
        } as any}
      >
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <PrivyElements />
        </AuthProvider>
      </PrivyProvider>
    </GluestackUIProvider>
  );
}
