import { ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import RecordingControls from '@/components/recording/RecordingControls';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import usePointBalance from '@/hooks/usePointBalance';
import { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import { useLogin } from '@privy-io/expo/ui';
import { Button, ButtonText } from "@/components/ui/button";
import { useAuth } from '@/lib/oto-auth';

export default function HomeScreen() {
  const { data: balance } = usePointBalance();
  const [isRecording, setIsRecording] = useState(false);
  const { user, isReady, loginWithSolana } = useAuth();
  const { login } = useLogin();

  const handleConnectWallet = async () => {
    try{
      await loginWithSolana();
    }catch(error){
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="flex-1 mt-24 justify-center items-center px-5 py-8 pt-4 pb-12 bg-gradient-to-b from-background-0 to-background-50">
          {/* Header Section */}
          <Box className="items-center">
            <Heading size="6xl" weight="light" className="text-primary-900 mb-3 tracking-tight">
              oto
            </Heading>
            <Text size="lg" className="text-typography-600 text-center mb-2">
              Record, Analyze & Share Conversations
            </Text>
            <Box className="flex-row items-center mt-2">
              <Box className="w-2 h-2 bg-success-500 rounded-full mr-2" />
              <Text size="sm" className={`text-success-600 font-medium ${isRecording ? 'hidden' : ''}`}>
                Ready to record
              </Text>
              <Text size="sm" className={`text-error-600 font-medium ${isRecording ? '' : 'hidden'}`}>
                Recording...
              </Text>
            </Box>
          </Box>

          {!isReady && <Box className="justify-center items-center h-64">
            <ActivityIndicator size="large" color="#0000ff" />
          </Box>}
          
          {/* Recording Section */}
          {user && isReady && <Box className="justify-center items-center">
            <RecordingControls isRecording={isRecording} setRecording={setIsRecording} />
          </Box>}
          {!user && isReady && <Box className="justify-center items-center h-64">
            <Text className="text-typography-900 mb-4 text-md">Login with:</Text>
            <Button onPress={() => login({ loginMethods: ["email"] })} className="w-32 bg-transparent border-primary-600 border-[1px]">
              <ButtonText className="text-primary-600 text-md">Email</ButtonText>
            </Button>
            <Button onPress={handleConnectWallet} className="mt-4 w-32 bg-transparent border-primary-600 border-[1px]">
              <ButtonText className="text-md text-primary-600">Solana</ButtonText>
            </Button>
          </Box>}

          {/* Quick Stats */}
          {user && isReady && <Box className="mt-12 mb-8">
            <Box className="flex-row justify-center space-x-12">
              <Box className="items-center">
                <Text size="2xl" weight="bold" className="text-typography-900">
                  {Math.floor(Math.random() * 200) + 50}<Text size="xs" className="text-typography-900 mt-1 text-sm font-medium">h</Text>
                </Text>
                <Text size="xs" className="text-typography-500 mt-1">
                  Total Time
                </Text>
              </Box>
              <Box className="items-center ml-8">
                <Text size="2xl" weight="bold" className="text-primary-600">
                  {Math.floor(Math.random() * 10) + 5}<Text size="xs" className="text-typography-900 mt-1 text-sm font-medium">h</Text>
                </Text>
                <Text size="xs" className="text-typography-500 mt-1">
                  This Week
                </Text>
              </Box>
              {/*Total Points */}
              <Box className="items-center ml-8">
                <Box className="flex-row items-center">
                  <Text size="2xl" weight="bold" className="text-typography-900">
                    {balance ? balance.points.toLocaleString() : '---'}<Text size="xs" className="text-typography-900 mt-1 text-sm font-medium">oto</Text>
                  </Text>
                </Box>
                <Text size="xs" className="text-typography-500 mt-1">
                  Total Points
                </Text>
              </Box>
            </Box>
          </Box>}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
