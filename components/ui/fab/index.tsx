import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Box } from '@/components/ui/box';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@gluestack-ui/nativewind-utils/cn';

interface FABProps {
  icon: string;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
  style?: ViewStyle;
}

export function FAB({
  icon,
  onPress,
  size = 'md',
  variant = 'primary',
  position = 'bottom-right',
  className,
  style,
}: FABProps) {
  const sizeStyles = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  const variantStyles = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-600 active:bg-secondary-700',
    success: 'bg-success-600 active:bg-success-700',
    warning: 'bg-warning-600 active:bg-warning-700',
    error: 'bg-error-600 active:bg-error-700',
  };

  const positionStyles = {
    'bottom-right': 'absolute bottom-6 right-6',
    'bottom-left': 'absolute bottom-6 left-6',
    'bottom-center': 'absolute bottom-6 self-center',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
    >
      <Box
        className={cn(
          'rounded-full items-center justify-center shadow-lg',
          sizeStyles[size],
          variantStyles[variant],
          positionStyles[position],
          className
        )}
      >
        <Ionicons 
          name={icon as any} 
          size={iconSizes[size]} 
          color="white" 
        />
      </Box>
    </TouchableOpacity>
  );
}

export function FABGroup({
  children,
  isOpen,
  onToggle,
  mainIcon = 'add',
  position = 'bottom-right',
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  mainIcon?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}) {
  return (
    <Box className={`absolute ${
      position === 'bottom-right' ? 'bottom-6 right-6' :
      position === 'bottom-left' ? 'bottom-6 left-6' :
      'bottom-6 self-center'
    }`}>
      {/* Action buttons */}
      {isOpen && (
        <Box className="mb-4 space-y-3">
          {children}
        </Box>
      )}
      
      {/* Main FAB */}
      <FAB
        icon={isOpen ? 'close' : mainIcon}
        onPress={onToggle}
        position="bottom-center"
        className="relative"
      />
    </Box>
  );
}
