import LoginScreen from "@/components/LoginScreen";
import { usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = usePrivy();
  //return user ? <Redirect href="/(tabs)" /> : <LoginScreen />;
  return <Redirect href="/(tabs)" />;
}
