import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@gluestack-ui/nativewind-utils/cn';

interface BoxProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export function Box({ children, className, style, ...props }: BoxProps) {
  return (
    <View
      className={cn('', className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
