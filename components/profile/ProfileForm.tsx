import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { UserProfileResponse } from '@/types/user';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Avatar from './Avatar';
import TagInput from './TagInput';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  profile: UserProfileResponse | null;
  onSave: (data: UserProfileResponse) => void;
  loading?: boolean;
}

const ProfileForm = memo(function ProfileForm({ profile, onSave, loading }: Props) {
  const [name, setName] = useState(profile?.name ?? '');
  const [age, setAge] = useState(profile?.age?.toString() ?? '');
  const [nationality, setNationality] = useState(profile?.nationality ?? '');
  const [firstLang, setFirstLang] = useState(profile?.first_language ?? '');
  const [secondLangs, setSecondLangs] = useState(profile?.second_languages ?? '');
  const [interests, setInterests] = useState(profile?.interests ?? '');
  const [topics, setTopics] = useState(profile?.preferred_topics ?? '');

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? '');
      setAge(profile.age !== null && profile.age !== undefined ? String(profile.age) : '');
      setNationality(profile.nationality ?? '');
      setFirstLang(profile.first_language ?? '');
      setSecondLangs(profile.second_languages ?? '');
      setInterests(profile.interests ?? '');
      setTopics(profile.preferred_topics ?? '');
    }
  }, [profile?.id]); // Only update when profile ID changes, not on every profile object change

  const initials = name
    ? name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'U';

  const handleSave = useCallback(() => {
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
  }, [profile?.id, name, age, nationality, firstLang, secondLangs, interests, topics, onSave]);

  const FormField = useCallback(({ label, children }: { label: string; children: React.ReactNode }) => (
    <Box className="mb-4">
      <Text size="sm" weight="medium" className="text-typography-700 mb-2">
        {label}
      </Text>
      {children}
    </Box>
  ), []);

  return (
    <Card variant="elevated" className="mx-0 mb-6">
      <CardBody>
        {/* Avatar Section */}
        <Box className="items-center mb-6">
          <Avatar initials={initials} />
          <Text size="lg" weight="medium" className="text-typography-900 mt-3">
            Personal Information
          </Text>
          <Text size="sm" className="text-typography-600">
            Update your profile details
          </Text>
        </Box>

        {/* Form Fields */}
        <Box className="space-y-4">
          <FormField label="Full Name">
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              className="focus:border-primary-600"
            />
          </FormField>

          <FormField label="Age">
            <Input
              value={age}
              onChangeText={setAge}
              placeholder="Enter your age"
              keyboardType="numeric"
              className="focus:border-primary-600"
            />
          </FormField>

          <FormField label="Nationality">
            <Input
              value={nationality}
              onChangeText={setNationality}
              placeholder="Enter your nationality"
              className="focus:border-primary-600"
            />
          </FormField>

          <FormField label="First Language">
            <Input
              value={firstLang}
              onChangeText={setFirstLang}
              placeholder="Enter your first language"
              className="focus:border-primary-600"
            />
          </FormField>

          <FormField label="Second Languages">
            <TagInput 
              label="" 
              value={secondLangs} 
              onChange={setSecondLangs}
              placeholder="Add languages (comma separated)"
            />
          </FormField>

          <FormField label="Interests">
            <TagInput 
              label="" 
              value={interests} 
              onChange={setInterests}
              placeholder="Add your interests (comma separated)"
            />
          </FormField>

          <FormField label="Preferred Topics">
            <TagInput 
              label="" 
              value={topics} 
              onChange={setTopics}
              placeholder="Add preferred topics (comma separated)"
            />
          </FormField>
        </Box>

        {/* Save Button */}
        <Box className="mt-6">
          <Button
            size="lg"
            onPress={handleSave}
            disabled={loading}
            className="w-full"
          >
            <Ionicons 
              name="save" 
              size={20} 
              color="white" 
              style={{ marginRight: 8 }} 
            />
            <ButtonText size="lg">
              {loading ? 'Saving...' : 'Save Profile'}
            </ButtonText>
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
});

export default ProfileForm;
