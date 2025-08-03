import React, { useState, useEffect } from 'react';
import { PointBalanceResponse, ClaimableAmountResponse } from '@/types/user';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import TransactionConfirmationModal from './TransactionConfirmationModal';
import TransactionSuccessModal from './TransactionSuccessModal';
import { ActivityIndicator } from 'react-native';

interface Props {
  balance: PointBalanceResponse | null;
  claimable?: ClaimableAmountResponse | null;
  onClaim?: () => void;
  claiming?: boolean;
  error?: string | null;
}

export default function EarningsPanel({ balance, claimable, onClaim, claiming, error }: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastClaimedAmount, setLastClaimedAmount] = useState<string>('0');
  const [wasClaiming, setWasClaiming] = useState(false);

  // Track claiming state changes to show success modal
  useEffect(() => {
    if (wasClaiming && !claiming && !error) {
      // Claim was successful
      setShowSuccessModal(true);
    }
    setWasClaiming(claiming || false);
  }, [claiming, error, claimable?.display_amount, wasClaiming]);

  const handleClaimPress = () => {
    setShowConfirmModal(true);
    setLastClaimedAmount(claimable?.display_amount || '0');
  };

  const handleConfirmClaim = () => {
    setShowConfirmModal(false);
    if (onClaim) {
      onClaim();
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Card variant="elevated" className="mx-0 mb-6">
      <CardBody>
        <Box className="items-center">
          {/* Header */}
          <Box className="items-center mb-6">
            <Box className="w-12 h-12 bg-success-100 rounded-full items-center justify-center mb-3">
              <Ionicons name="wallet" size={24} color="#059669" />
            </Box>
            <Heading size="lg" className="text-typography-900">
              Earnings
            </Heading>
            <Text size="sm" className="text-typography-600">
              Your current point balance
            </Text>
          </Box>

          {/* Current Balance */}
          <Box className="items-center mb-6">
            <Text size="4xl" weight="bold" className="text-primary-600 mb-1">
              {balance ? balance.points.toLocaleString() : '--'}
            </Text>
            <Text size="lg" className="text-typography-600">
              points
            </Text>
          </Box>

          {/* Claimable Section */}
          {claimable && (
            <Box className="w-full">
              <Box className="bg-success-50 rounded-xl p-4 mb-4">
                <Box className="items-center">
                  <Text size="sm" weight="medium" className="text-success-700 mb-2">
                    Available to Claim
                  </Text>
                  <Text size="2xl" weight="bold" className="text-success-600 mb-3">
                    {claimable.display_amount} pts
                  </Text>
                  
                  {onClaim && claimable.amount > 0 && (
                    <Button
                      size="md"
                      className="bg-success-600 w-full"
                      onPress={handleClaimPress}
                      disabled={claiming}
                    >
                      {!claiming && <Ionicons 
                        name="download" 
                        size={18} 
                        color="white" 
                        className="mr-2"
                      />}
                      {claiming && <ActivityIndicator className="mr-2" size="small" color="white" />}
                      <ButtonText>
                        {claiming ? 'Claiming...' : 'Claim Points'}
                      </ButtonText>
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Box className="w-full bg-error-50 border border-error-200 rounded-lg p-4 mt-4">
              <Box className="flex-row items-center">
                <Ionicons name="alert-circle" size={20} color="#dc2626" style={{ marginRight: 8 }} />
                <Text size="sm" className="text-error-700 flex-1">
                  {error}
                </Text>
              </Box>
            </Box>
          )}

          {/* Stats Row */}
          <Box className="flex-row justify-between w-full mt-6 pt-6 border-t border-outline-200">
            <Box className="items-center flex-1">
              <Text size="xs" className="text-typography-500 mb-1">
                This Month
              </Text>
              <Text size="lg" weight="semibold" className="text-typography-900">
                {balance ? Math.floor(balance.points * 0.3).toLocaleString() : '--'}
              </Text>
            </Box>
            <Box className="items-center flex-1">
              <Text size="xs" className="text-typography-500 mb-1">
                Total Earned
              </Text>
              <Text size="lg" weight="semibold" className="text-typography-900">
                {balance ? Math.floor(balance.points * 1.5).toLocaleString() : '--'}
              </Text>
            </Box>
          </Box>
        </Box>
      </CardBody>

      {/* Transaction Confirmation Modal */}
      <TransactionConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmClaim}
        amount={claimable?.display_amount || '0'}
        isLoading={claiming}
        error={error}
      />

      {/* Transaction Success Modal */}
      <TransactionSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        amount={lastClaimedAmount}
      />
    </Card>
  );
}
