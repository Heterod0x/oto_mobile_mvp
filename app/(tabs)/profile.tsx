import { ScrollView, View, ActivityIndicator } from 'react-native';
import useUserProfile from '@/hooks/useUserProfile';
import usePointBalance from '@/hooks/usePointBalance';
import ProfileForm from '@/components/profile/ProfileForm';
import EarningsPanel from '@/components/profile/EarningsPanel';
import AccountActions from '@/components/profile/AccountActions';

export default function ProfileScreen() {
  const {
    data: profile,
    loading: loadingProfile,
    save,
  } = useUserProfile();
  const {
    data: balance,
    loading: loadingPoint,
  } = usePointBalance();

  const loading = loadingProfile || loadingPoint;

  if (loading && !profile && !balance) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <ProfileForm profile={profile} loading={loadingProfile} onSave={save} />
      <EarningsPanel balance={balance} loading={loadingPoint} />
      <AccountActions />
    </ScrollView>
  );
}
