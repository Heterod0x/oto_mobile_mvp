import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@gluestack-ui/nativewind-utils/cn';

interface CardProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  className, 
  variant = 'elevated',
  size = 'md',
  style,
  ...props 
}: CardProps) {
  const baseStyles = 'bg-background-0 rounded-xl';
  
  const variantStyles = {
    elevated: 'shadow-lg border border-outline-100',
    outline: 'border border-outline-200',
    ghost: 'border-0',
  };

  const sizeStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <View
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({ 
  children, 
  className, 
  ...props 
}: ViewProps & { children?: React.ReactNode; className?: string }) {
  return (
    <View
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardBody({ 
  children, 
  className, 
  ...props 
}: ViewProps & { children?: React.ReactNode; className?: string }) {
  return (
    <View
      className={cn('', className)}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardFooter({ 
  children, 
  className, 
  ...props 
}: ViewProps & { children?: React.ReactNode; className?: string }) {
  return (
    <View
      className={cn('mt-4', className)}
      {...props}
    >
      {children}
    </View>
  );
}
