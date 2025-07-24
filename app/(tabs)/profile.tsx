import { View, Text, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import useUserProfile from '@/hooks/useUserProfile';
import usePointBalance from '@/hooks/usePointBalance';
import usePointClaim from '@/hooks/usePointClaim';
import ProfileForm from '@/components/profile/ProfileForm';
import EarningsPanel from '@/components/profile/EarningsPanel';
import AccountActions from '@/components/profile/AccountActions';

export default function ProfileScreen() {
  const { user } = usePrivy();
  const { data: profile, loading: loadingProfile, save } = useUserProfile();
  const { data: balance } = usePointBalance();
  const { data: claimable, claim, claiming } = usePointClaim();

  if (!user) return null;

  if (loadingProfile && !profile) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>プロフィール取得失敗</Text>
      </View>
    );
  }

  const handleSave = async (data: any) => {
    await save(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <ProfileForm profile={profile} onSave={handleSave} loading={loadingProfile} />
        <EarningsPanel
          balance={balance}
          claimable={claimable}
          onClaim={claim}
          claiming={claiming}
        />
        <AccountActions />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
