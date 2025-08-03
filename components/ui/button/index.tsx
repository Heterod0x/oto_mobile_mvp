import React from 'react';
import { Pressable, Text } from 'react-native';
import { cn } from '@gluestack-ui/nativewind-utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = 'solid',
  size = 'md',
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyles = 'rounded-lg items-center justify-center flex-row';
  
  const variantStyles = {
    solid: 'bg-primary-600 active:bg-primary-700',
    outline: 'border border-primary-600 bg-transparent active:bg-primary-50',
    ghost: 'bg-transparent active:bg-primary-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 min-h-[32px]',
    md: 'px-4 py-3 min-h-[44px]',
    lg: 'px-6 py-4 min-h-[52px]',
  };

  const disabledStyles = disabled ? 'opacity-50' : '';

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        className
      )}
    >
      {children}
    </Pressable>
  );
}

export function ButtonText({
  children,
  variant = 'solid',
  size = 'md',
  className,
}: {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const variantStyles = {
    solid: 'text-white font-medium',
    outline: 'text-primary-600 font-medium',
    ghost: 'text-primary-600 font-medium',
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Text
      className={cn(
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Text>
  );
}
