import { Microtrend } from '@/types/trend';
import { TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  microtrend: Microtrend;
  onPress?: () => void;
}

const getMicrotrendIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('tech') || lowerTitle.includes('ai') || lowerTitle.includes('digital')) {
    return 'hardware-chip';
  } else if (lowerTitle.includes('health') || lowerTitle.includes('wellness') || lowerTitle.includes('fitness')) {
    return 'fitness';
  } else if (lowerTitle.includes('food') || lowerTitle.includes('cooking') || lowerTitle.includes('recipe')) {
    return 'restaurant';
  } else if (lowerTitle.includes('travel') || lowerTitle.includes('vacation') || lowerTitle.includes('trip')) {
    return 'airplane';
  } else if (lowerTitle.includes('work') || lowerTitle.includes('career') || lowerTitle.includes('business')) {
    return 'briefcase';
  } else if (lowerTitle.includes('music') || lowerTitle.includes('song') || lowerTitle.includes('artist')) {
    return 'musical-notes';
  } else if (lowerTitle.includes('movie') || lowerTitle.includes('film') || lowerTitle.includes('show')) {
    return 'film';
  } else if (lowerTitle.includes('sport') || lowerTitle.includes('game') || lowerTitle.includes('team')) {
    return 'trophy';
  } else if (lowerTitle.includes('fashion') || lowerTitle.includes('style') || lowerTitle.includes('clothing')) {
    return 'shirt';
  } else {
    return 'trending-up';
  }
};

const getMicrotrendColor = (index: number) => {
  const colors = [
    { bg: 'bg-purple-100', text: 'text-purple-700', icon: '#7c3aed' },
    { bg: 'bg-pink-100', text: 'text-pink-700', icon: '#db2777' },
    { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: '#4f46e5' },
    { bg: 'bg-cyan-100', text: 'text-cyan-700', icon: '#0891b2' },
    { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '#059669' },
    { bg: 'bg-amber-100', text: 'text-amber-700', icon: '#d97706' },
    { bg: 'bg-rose-100', text: 'text-rose-700', icon: '#e11d48' },
    { bg: 'bg-violet-100', text: 'text-violet-700', icon: '#7c2d12' },
  ];
  return colors[index % colors.length];
};

export default function MicrotrendCard({ microtrend, onPress }: Props) {
  const icon = getMicrotrendIcon(microtrend.title);
  const colorScheme = getMicrotrendColor(Math.abs(microtrend.title.charCodeAt(0)) % 8);
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" className="mb-3 mx-1">
        <CardBody>
          <Box className="flex-row items-center">
            {/* Icon */}
            <Box className={`w-12 h-12 ${colorScheme.bg} rounded-full items-center justify-center mr-4`}>
              <Ionicons 
                name={icon as any} 
                size={20} 
                color={colorScheme.icon} 
              />
            </Box>

            {/* Content */}
            <Box className="flex-1">
              <Heading size="md" className="text-typography-900 mb-1" numberOfLines={2}>
                {microtrend.title}
              </Heading>
              
              {/* Trend indicator */}
              <Box className="flex-row items-center">
                <Box className="flex-row items-center mr-4">
                  <Ionicons name="pulse" size={12} color="#059669" style={{ marginRight: 4 }} />
                  <Text size="xs" className="text-success-600 font-medium">
                    Trending
                  </Text>
                </Box>
                
                {/* Volume indicator */}
                <Box className="flex-row items-center">
                  <Ionicons name="people" size={12} color="#6b7280" style={{ marginRight: 4 }} />
                  <Text size="xs" className="text-typography-500">
                    {Math.floor(Math.random() * 1000) + 100}+ mentions
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Arrow */}
            <Box className="ml-2">
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </Box>
          </Box>

          {/* Trend line visualization */}
          <Box className="mt-4">
            <Box className="flex-row items-end h-8 space-x-1">
              {[...Array(12)].map((_, i) => {
                const height = Math.random() * 24 + 8;
                const isLast = i === 11;
                return (
                  <Box
                    key={i}
                    className={`flex-1 rounded-t ${isLast ? 'bg-success-500' : 'bg-background-300'}`}
                    style={{ height }}
                  />
                );
              })}
            </Box>
            <Text size="xs" className="text-typography-400 text-center mt-2">
              Activity over time
            </Text>
          </Box>
        </CardBody>
      </Card>
    </TouchableOpacity>
  );
}
