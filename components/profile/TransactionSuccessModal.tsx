import React from 'react';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Ionicons } from '@expo/vector-icons';

interface TransactionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
}

export default function TransactionSuccessModal({
  isOpen,
  onClose,
  amount
}: TransactionSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <Box className="items-center">
          <Box className="w-16 h-16 bg-success-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="checkmark-circle" size={32} color="#059669" />
          </Box>
          <Heading size="xl" className="text-typography-900">
            Transaction Successful!
          </Heading>
        </Box>
      </ModalHeader>

      <ModalBody>
        <Box className="items-center">
          <Text size="md" className="text-typography-600 text-center mb-6">
            Your points have been successfully claimed and added to your balance.
          </Text>

          {/* Success Details */}
          <Box className="w-full bg-success-50 rounded-lg p-4 mb-4">
            <Box className="items-center">
              <Text size="sm" className="text-success-700 mb-2">
                Points Claimed
              </Text>
              <Text size="3xl" weight="bold" className="text-success-600 mb-2">
                +{amount} oto
              </Text>
              <Text size="xs" className="text-success-600">
                Added to your balance
              </Text>
            </Box>
          </Box>

          {/* Transaction Info */}
          <Box className="w-full bg-background-50 rounded-lg p-4">
            <Box className="flex-row items-center justify-center">
              <Ionicons name="shield-checkmark" size={16} color="#059669" style={{ marginRight: 6 }} />
              <Text size="sm" className="text-typography-600">
                Transaction verified on Solana
              </Text>
            </Box>
          </Box>
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button
          size="md"
          className="flex-1 bg-success-600"
          onPress={onClose}
        >
          <ButtonText>Continue</ButtonText>
        </Button>
      </ModalFooter>
    </Modal>
  );
}
