import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  return (
    <PrivyProvider
      appId={"cmd4amohq0271l80m1kvuuzji"}
      clientId={"client-WY6Nkeh5iEHdTpf63kTW33bn9KALu2MJjF3qbcSv7nax1"}
    >
      <Stack />
      <PrivyElements />
    </PrivyProvider>
  );
}
