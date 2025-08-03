import { memo } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const TagInput = memo(function TagInput({ label, value, onChange, placeholder = "tag1, tag2" }: Props) {
  const tags = value ? value.split(',').map(tag => tag.trim()).filter(Boolean) : [];
  
  return (
    <Box>
      {label && (
        <Text size="sm" weight="medium" className="text-typography-700 mb-2">
          {label}
        </Text>
      )}
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        className="focus:border-primary-600"
        multiline
      />
      {tags.length > 0 && (
        <Box className="flex-row flex-wrap mt-2 gap-2">
          {tags.map((tag, index) => (
            <Box
              key={index}
              className="bg-primary-100 px-3 py-1 rounded-full"
            >
              <Text size="xs" className="text-primary-700">
                {tag}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default TagInput;
