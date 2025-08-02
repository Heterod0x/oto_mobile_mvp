import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '@gluestack-ui/nativewind-utils/cn';

interface InputProps extends TextInputProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'underlined' | 'rounded';
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export function Input({
  className,
  size = 'md',
  variant = 'outline',
  isInvalid = false,
  isDisabled = false,
  style,
  ...props
}: InputProps) {
  const baseStyles = 'text-typography-900 font-normal';
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-2 min-h-[36px]',
    md: 'text-base px-4 py-3 min-h-[44px]',
    lg: 'text-lg px-5 py-4 min-h-[52px]',
  };

  const variantStyles = {
    outline: 'border border-outline-300 rounded-lg bg-background-0',
    underlined: 'border-b border-outline-300 bg-transparent rounded-none',
    rounded: 'border border-outline-300 rounded-full bg-background-0',
  };

  const stateStyles = {
    invalid: 'border-error-600',
    disabled: 'opacity-50 bg-background-100',
    focus: 'border-primary-600',
  };

  return (
    <TextInput
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        isInvalid && stateStyles.invalid,
        isDisabled && stateStyles.disabled,
        className
      )}
      style={style}
      editable={!isDisabled}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
}

export function InputField({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
}
