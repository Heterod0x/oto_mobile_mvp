import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/oto-auth';

export default function AccountActions() {
  const { logout } = useAuth();

  const redirectToHome = () => {
    logout();
    router.replace('/(tabs)');
  }

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: redirectToHome },
      ]
    );
  };

  const ActionButton = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    variant = 'outline',
    destructive = false 
  }: {
    icon: string;
    title: string;
    subtitle: string;
    onPress: () => void;
    variant?: 'outline' | 'solid';
    destructive?: boolean;
  }) => (
    <Button
      variant={variant}
      size="md"
      onPress={onPress}
      className={`w-full mb-3 ${destructive ? 'border-error-300' : ''}`}
    >
      <Box className="flex-row items-center justify-start w-full">
        <Box className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
          destructive ? 'bg-error-100' : 'bg-primary-100'
        }`}>
          <Ionicons 
            name={icon as any} 
            size={20} 
            color={destructive ? '#dc2626' : '#4f46e5'} 
          />
        </Box>
        <Box className="flex-1">
          <Text 
            size="md" 
            weight="medium" 
            className={destructive ? 'text-error-700' : 'text-typography-900'}
          >
            {title}
          </Text>
          <Text size="sm" className="text-typography-600">
            {subtitle}
          </Text>
        </Box>
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color="#9ca3af" 
        />
      </Box>
    </Button>
  );

  return (
    <Card variant="elevated" className="mx-0 mb-6">
      <CardBody>
        <Box className="mb-4">
          <Heading size="lg" className="text-typography-900 mb-2">
            Account Settings
          </Heading>
          <Text size="sm" className="text-typography-600">
            Manage your account preferences
          </Text>
        </Box>

        <Box>
          <ActionButton
            icon="notifications"
            title="Notifications"
            subtitle="Manage your notification preferences"
            onPress={() => {
              // TODO: Navigate to notifications settings
              Alert.alert('Coming Soon', 'Notification settings will be available soon.');
            }}
          />

          <ActionButton
            icon="shield-checkmark"
            title="Privacy & Security"
            subtitle="Control your privacy settings"
            onPress={() => {
              // TODO: Navigate to privacy settings
              Alert.alert('Coming Soon', 'Privacy settings will be available soon.');
            }}
          />

          <ActionButton
            icon="help-circle"
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => {
              // TODO: Navigate to help
              Alert.alert('Coming Soon', 'Help section will be available soon.');
            }}
          />

          <ActionButton
            icon="information-circle"
            title="About"
            subtitle="App version and information"
            onPress={() => {
              Alert.alert('OTO v1.0.0', 'Record, Analyze & Share Conversations');
            }}
          />

          <Box className="border-t border-outline-200 pt-4 mt-2">
            <ActionButton
              icon="log-out"
              title="Logout"
              subtitle="Sign out of your account"
              onPress={handleLogout}
              destructive={true}
            />
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
