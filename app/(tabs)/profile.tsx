import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import useUserProfile from '@/hooks/useUserProfile';
import usePointBalance from '@/hooks/usePointBalance';
import ProfileForm from '@/components/profile/ProfileForm';
import EarningsPanel from '@/components/profile/EarningsPanel';
import AccountActions from '@/components/profile/AccountActions';

export default function ProfileScreen() {
  const { user } = usePrivy();
  const { data: profile, loading: loadingProfile, save } = useUserProfile();
  const { data: balance } = usePointBalance();

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
    <ScrollView style={{ flex: 1 }}>
      <ProfileForm profile={profile} onSave={handleSave} loading={loadingProfile} />
      <EarningsPanel balance={balance} />
      <AccountActions />
    </ScrollView>
  );
}
