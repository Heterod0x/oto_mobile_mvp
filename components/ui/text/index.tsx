import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cn } from '@gluestack-ui/nativewind-utils/cn';

interface TextProps extends RNTextProps {
  children?: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export function Text({ 
  children, 
  className, 
  size = 'md',
  weight = 'normal',
  style,
  ...props 
}: TextProps) {
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <RNText
      className={cn(
        'text-typography-900',
        sizeStyles[size],
        weightStyles[weight],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Heading({ 
  children, 
  className, 
  size = '2xl',
  weight = 'bold',
  style,
  ...props 
}: TextProps) {
  return (
    <Text
      className={cn('text-typography-900', className)}
      size={size}
      weight={weight}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}
