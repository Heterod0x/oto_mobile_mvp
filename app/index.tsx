import LoginScreen from "@/components/LoginScreen";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
