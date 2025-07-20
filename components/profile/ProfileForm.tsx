import { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { UserProfileResponse } from '@/types/user';
import Avatar from './Avatar';
import LabeledInput from './LabeledInput';
import TagInput from './TagInput';

interface Props {
  profile: UserProfileResponse | null;
  onSave: (data: UserProfileResponse) => void;
  loading?: boolean;
}

export default function ProfileForm({ profile, onSave, loading }: Props) {
  const [name, setName] = useState(profile?.name ?? '');
  const [age, setAge] = useState(profile?.age?.toString() ?? '');
  const [nationality, setNationality] = useState(profile?.nationality ?? '');
  const [firstLang, setFirstLang] = useState(profile?.first_language ?? '');
  const [secondLangs, setSecondLangs] = useState(profile?.second_languages ?? '');
  const [interests, setInterests] = useState(profile?.interests ?? '');
  const [topics, setTopics] = useState(profile?.preferred_topics ?? '');

  useEffect(() => {
    setName(profile?.name ?? '');
    setAge(profile?.age !== null && profile?.age !== undefined ? String(profile.age) : '');
    setNationality(profile?.nationality ?? '');
    setFirstLang(profile?.first_language ?? '');
    setSecondLangs(profile?.second_languages ?? '');
    setInterests(profile?.interests ?? '');
    setTopics(profile?.preferred_topics ?? '');
  }, [profile]);

  const initials = name
    ? name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'U';

  const handleSave = () => {
    onSave({
      id: profile?.id ?? '',
      name,
      age: age ? parseInt(age, 10) : null,
      nationality: nationality || null,
      first_language: firstLang || null,
      second_languages: secondLangs || null,
      interests: interests || null,
      preferred_topics: topics || null,
    });
  };

  return (
    <View style={styles.container}>
      <Avatar initials={initials} />
      <LabeledInput label="Name" value={name} onChange={setName} />
      <LabeledInput label="Age" value={age} onChange={setAge} keyboardType="numeric" />
      <LabeledInput label="Nationality" value={nationality} onChange={setNationality} />
      <LabeledInput label="First Language" value={firstLang} onChange={setFirstLang} />
      <TagInput label="Second Languages" value={secondLangs} onChange={setSecondLangs} />
      <TagInput label="Interests" value={interests} onChange={setInterests} />
      <TagInput label="Preferred Topics" value={topics} onChange={setTopics} />
      <Button title="Save" onPress={handleSave} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
