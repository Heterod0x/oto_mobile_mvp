import React from 'react';
import { Modal as RNModal, Pressable, Dimensions } from 'react-native';
import { Box } from '../box';
import { Text, Heading } from '../text';
import { Button, ButtonText } from '../button';
import { Card, CardBody } from '../card';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

interface ModalBodyProps {
  children: React.ReactNode;
}

interface ModalFooterProps {
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <RNModal
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
      backdropColor="transparent"
    >
      <Pressable 
        className="flex-1 bg-black/0 justify-center items-center px-4"
        onPress={onClose}
      >
        <Pressable 
          className="w-full max-w-sm"
          onPress={(e) => e.stopPropagation()}
        >
          <Card variant="elevated" className="mx-0">
            <CardBody className="p-0">
              {children}
            </CardBody>
          </Card>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <Box className="flex-row items-center justify-between p-6 pb-4">
      <Box className="flex-1">
        {children}
      </Box>
    </Box>
  );
}

export function ModalBody({ children }: ModalBodyProps) {
  return (
    <Box className="px-6 pb-4">
      {children}
    </Box>
  );
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <Box className="flex-row gap-3 p-6 pt-4 border-t border-outline-200">
      {children}
    </Box>
  );
}
