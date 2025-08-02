import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'large' | 'minimal';
}

export function Header({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightElement,
  variant = 'default',
}: HeaderProps) {
  const isLarge = variant === 'large';
  const isMinimal = variant === 'minimal';

  return (
    <SafeAreaView className="bg-background-0">
      <Box className={`px-5 ${isLarge ? 'py-6 pt-4' : 'py-4 pt-2'} ${isMinimal ? 'border-b-0' : 'border-b border-outline-100'}`}>
        <Box className="flex-row items-center justify-between">
          {/* Left side */}
          <Box className="flex-row items-center flex-1">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onPress={onBackPress}
                className="mr-3 -ml-2"
              >
                <Ionicons name="chevron-back" size={24} color="#4f46e5" />
              </Button>
            )}
            
            <Box className="flex-1">
              <Heading 
                size={isLarge ? '2xl' : 'lg'} 
                className="text-typography-900"
              >
                {title}
              </Heading>
              {subtitle && (
                <Text 
                  size={isLarge ? 'md' : 'sm'} 
                  className="text-typography-600 mt-1"
                >
                  {subtitle}
                </Text>
              )}
            </Box>
          </Box>

          {/* Right side */}
          {rightElement && (
            <Box className="ml-4">
              {rightElement}
            </Box>
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export function HeaderAction({
  icon,
  onPress,
  badge,
}: {
  icon: string;
  onPress: () => void;
  badge?: number;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onPress={onPress}
      className="relative"
    >
      <Ionicons name={icon as any} size={24} color="#4f46e5" />
      {badge && badge > 0 && (
        <Box className="absolute -top-1 -right-1 w-5 h-5 bg-error-600 rounded-full items-center justify-center">
          <Text size="xs" className="text-white font-bold">
            {badge > 99 ? '99+' : badge.toString()}
          </Text>
        </Box>
      )}
    </Button>
  );
}
