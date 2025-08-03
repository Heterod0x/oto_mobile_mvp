import React from 'react';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Ionicons } from '@expo/vector-icons';

interface TransactionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function TransactionConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  amount,
  isLoading = false,
  error
}: TransactionConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <Box className="items-center">
          <Box className="w-12 h-12 bg-warning-100 rounded-full items-center justify-center mb-3">
            <Ionicons name="shield-checkmark" size={24} color="#d97706" />
          </Box>
          <Heading size="lg" className="text-typography-900">
            Sign Transaction
          </Heading>
        </Box>
      </ModalHeader>

      <ModalBody>
        <Box className="items-center mb-6">
          <Text size="sm" className="text-typography-600 text-center mb-4">
            You are about to sign a transaction to claim your points. Please review the details below:
          </Text>

          {/* Transaction Details */}
          <Box className="w-full bg-background-50 rounded-lg p-4 mb-4">
            <Box className="flex-row justify-between items-center mb-3">
              <Text size="sm" className="text-typography-600">
                Amount to Claim:
              </Text>
              <Text size="lg" weight="bold" className="text-success-600">
                {amount} pts
              </Text>
            </Box>
            
            <Box className="flex-row justify-between items-center mb-3">
              <Text size="sm" className="text-typography-600">
                Transaction Type:
              </Text>
              <Text size="sm" weight="medium" className="text-typography-900">
                Point Claim
              </Text>
            </Box>

            <Box className="flex-row justify-between items-center">
              <Text size="sm" className="text-typography-600">
                Network:
              </Text>
              <Text size="sm" weight="medium" className="text-typography-900">
                Solana
              </Text>
            </Box>
          </Box>

          {/* Security Notice */}
          <Box className="w-full bg-info-50 border border-info-200 rounded-lg p-4 mb-4">
            <Box className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#0ea5e9" style={{ marginRight: 8, marginTop: 2 }} />
              <Box className="flex-1">
                <Text size="sm" weight="medium" className="text-info-700 mb-1">
                  Security Notice
                </Text>
                <Text size="xs" className="text-info-600">
                  This transaction will be signed with your wallet. Make sure you trust this action before proceeding.
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Error Message */}
          {error && (
            <Box className="w-full bg-error-50 border border-error-200 rounded-lg p-4 mb-4">
              <Box className="flex-row items-center">
                <Ionicons name="alert-circle" size={20} color="#dc2626" style={{ marginRight: 8 }} />
                <Text size="sm" className="text-error-700 flex-1">
                  {error}
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          size="md"
          className="flex-1"
          onPress={onClose}
          disabled={isLoading}
        >
          <ButtonText className="text-primary-600">Cancel</ButtonText>
        </Button>
        
        <Button
          size="md"
          className="flex-1 bg-success-600"
          onPress={onConfirm}
          disabled={isLoading}
        >
          {isLoading && (
            <Ionicons 
              name="hourglass" 
              size={18} 
              color="white" 
              style={{ marginRight: 8 }} 
            />
          )}
          <ButtonText>
            {isLoading ? 'Signing...' : 'Sign'}
          </ButtonText>
        </Button>
      </ModalFooter>
    </Modal>
  );
}
