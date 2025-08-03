import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface Props {
  initials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Avatar({ initials, size = 'lg' }: Props) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'xs' as const,
    md: 'sm' as const,
    lg: 'xl' as const,
    xl: '2xl' as const,
  };

  return (
    <Box className={`${sizeStyles[size]} rounded-full bg-primary-600 justify-center items-center shadow-lg`}>
      <Text 
        size={textSizes[size]} 
        weight="semibold" 
        className="text-white"
      >
        {initials}
      </Text>
    </Box>
  );
}
