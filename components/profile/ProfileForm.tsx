import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserProfileResponse, UserUpdateRequest } from '@/types/user';

interface Props {
  profile: UserProfileResponse | null;
  loading: boolean;
  onSave: (data: UserUpdateRequest) => void;
}

export default function ProfileForm({ profile, loading, onSave }: Props) {
  const [form, setForm] = useState<UserUpdateRequest>({});

  const handleChange = (field: keyof UserUpdateRequest, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleNumberChange = (field: keyof UserUpdateRequest, value: string) => {
    const n = parseInt(value, 10);
    handleChange(field, isNaN(n) ? value : n as any);
  };

  const handleSave = () => {
    onSave({ ...profile, ...form });
  };

  if (!profile) {
    return (
      <View style={styles.card}>
        <Text style={styles.error}>プロフィール取得失敗</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>名前</Text>
      <TextInput
        style={styles.input}
        value={form.name ?? profile.name ?? ''}
        onChangeText={(v) => handleChange('name', v)}
        editable={!loading}
      />
      <Text style={styles.label}>年齢</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={(form.age ?? profile.age ?? '').toString()}
        onChangeText={(v) => handleNumberChange('age', v)}
        editable={!loading}
      />
      <Text style={styles.label}>国籍</Text>
      <TextInput
        style={styles.input}
        value={form.nationality ?? profile.nationality ?? ''}
        onChangeText={(v) => handleChange('nationality', v)}
        editable={!loading}
      />
      <Text style={styles.label}>第一言語</Text>
      <TextInput
        style={styles.input}
        value={form.first_language ?? profile.first_language ?? ''}
        onChangeText={(v) => handleChange('first_language', v)}
        editable={!loading}
      />
      <Text style={styles.label}>第二言語(カンマ区切り)</Text>
      <TextInput
        style={styles.input}
        value={form.second_languages ?? profile.second_languages ?? ''}
        onChangeText={(v) => handleChange('second_languages', v)}
        editable={!loading}
      />
      <Text style={styles.label}>興味・関心(カンマ区切り)</Text>
      <TextInput
        style={styles.input}
        value={form.interests ?? profile.interests ?? ''}
        onChangeText={(v) => handleChange('interests', v)}
        editable={!loading}
      />
      <Text style={styles.label}>好みのトピック(カンマ区切り)</Text>
      <TextInput
        style={styles.input}
        value={form.preferred_topics ?? profile.preferred_topics ?? ''}
        onChangeText={(v) => handleChange('preferred_topics', v)}
        editable={!loading}
      />
      <Button title={loading ? '保存中...' : '保存'} onPress={handleSave} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
