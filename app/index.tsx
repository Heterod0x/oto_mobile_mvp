import LoginScreen from "@/components/LoginScreen";
import UserScreen from "@/components/UserScreen";
import { usePrivy } from "@privy-io/expo";

export default function Index() {
  const { user } = usePrivy();
  return user ? <UserScreen /> : <LoginScreen />;
}
