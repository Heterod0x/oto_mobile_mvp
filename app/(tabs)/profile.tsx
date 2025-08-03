import { ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useCallback } from 'react';
import useUserProfile from '@/hooks/useUserProfile';
import usePointBalance from '@/hooks/usePointBalance';
import usePointClaim from '@/hooks/usePointClaim';
import ProfileForm from '@/components/profile/ProfileForm';
import EarningsPanel from '@/components/profile/EarningsPanel';
import AccountActions from '@/components/profile/AccountActions';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { useAuth } from '@/lib/oto-auth';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { data: profile, loading: loadingProfile, save } = useUserProfile();
  const { data: balance } = usePointBalance();
  const { data: claimable, claim, claiming, error: claimError } = usePointClaim();

  const handleSave = useCallback(async (data: any) => {
    await save(data);
  }, [save]);

  if (!user) return null;

  if (loadingProfile && !profile) {
    return (
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center items-center bg-background-0">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text size="lg" className="text-typography-600 mt-4">Loading profile...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center items-center bg-background-0">
          <Text size="lg" className="text-error-600">Failed to load profile</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView 
          className="flex-1 bg-background-0" 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Box className="px-5 py-6 pt-24">
            <Box className="mb-8">
              <Heading size="2xl" className="text-typography-900 mb-2">Profile</Heading>
              <Text size="md" className="text-typography-600">
                Manage your account settings and preferences
              </Text>
            </Box>
            
            <ProfileForm profile={profile} onSave={handleSave} loading={loadingProfile} />
            <EarningsPanel
              balance={balance}
              claimable={claimable}
              onClaim={claim}
              claiming={claiming}
              error={claimError}
            />
            <AccountActions />
          </Box>
          <Box className="h-20"/>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
