import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USER, MOCK_REWARDS } from '../../constants/mockData';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'upgrade', label: 'Upgrades' },
  { id: 'free_drink', label: 'Free Drinks' },
  { id: 'food', label: 'Food' },
  { id: 'impact', label: 'Impact' },
  { id: 'discount', label: 'Discounts' },
];

function RedeemModal({
  reward,
  visible,
  onClose,
  onConfirm,
  userPoints,
}: {
  reward: (typeof MOCK_REWARDS)[0] | null;
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userPoints: number;
}) {
  if (!reward) return null;
  const canAfford = userPoints >= reward.pointsCost;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="w-12 h-1 bg-gray-200 rounded-full self-center mb-6" />

          <View className="items-center mb-5">
            <View className="w-20 h-20 rounded-3xl bg-cream items-center justify-center mb-3">
              <Text style={{ fontSize: 40 }}>{reward.emoji}</Text>
            </View>
            <Text className="text-xl font-bold text-text-dark">{reward.name}</Text>
            <Text className="text-text-soft text-sm mt-1 text-center">{reward.description}</Text>
          </View>

          <View className="bg-cream rounded-2xl p-4 mb-5">
            <View className="flex-row justify-between mb-2">
              <Text className="text-text-soft">Cost</Text>
              <Text className="text-text-dark font-semibold">{reward.pointsCost} pts</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-text-soft">Your balance</Text>
              <Text className={`font-semibold ${canAfford ? 'text-primary' : 'text-red-500'}`}>
                {userPoints} pts
              </Text>
            </View>
            {canAfford && (
              <>
                <View className="h-px bg-gray-200 my-3" />
                <View className="flex-row justify-between">
                  <Text className="text-text-soft">After redemption</Text>
                  <Text className="text-text-dark font-bold">
                    {userPoints - reward.pointsCost} pts
                  </Text>
                </View>
              </>
            )}
          </View>

          {canAfford ? (
            <TouchableOpacity
              onPress={onConfirm}
              className="bg-primary rounded-xl py-4 items-center mb-3"
              activeOpacity={0.85}
            >
              <Text className="text-white font-semibold text-base">Redeem Reward</Text>
            </TouchableOpacity>
          ) : (
            <View className="bg-gray-100 rounded-xl py-4 items-center mb-3">
              <Text className="text-text-soft font-semibold text-base">
                Need {reward.pointsCost - userPoints} more points
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={onClose} className="items-center py-2">
            <Text className="text-text-soft font-medium">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function SuccessModal({ visible, reward, onClose }: { visible: boolean; reward: string; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 items-center justify-center px-8">
        <View className="bg-white rounded-3xl p-8 items-center w-full">
          <Text style={{ fontSize: 60, marginBottom: 12 }}>🎁</Text>
          <Text className="text-2xl font-bold text-text-dark mb-2">Reward Redeemed!</Text>
          <Text className="text-text-soft text-center mb-6">
            Show this to the barista to claim your {reward}.
          </Text>
          <View
            className="bg-primary-pale rounded-2xl p-4 w-full items-center mb-6"
          >
            <Text className="text-primary text-lg font-bold tracking-widest">CR-{Math.floor(Math.random() * 90000) + 10000}</Text>
            <Text className="text-text-soft text-xs mt-1">Redemption code</Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="bg-primary rounded-xl py-3.5 w-full items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-semibold text-base">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function SpendScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedReward, setSelectedReward] = useState<(typeof MOCK_REWARDS)[0] | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userPoints, setUserPoints] = useState(MOCK_USER.cityRewardsBalance);
  const [redeemedName, setRedeemedName] = useState('');

  const filtered = activeCategory === 'all'
    ? MOCK_REWARDS
    : MOCK_REWARDS.filter((r) => r.category === activeCategory);

  const handleRewardPress = (reward: typeof MOCK_REWARDS[0]) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    setUserPoints((prev) => prev - selectedReward.pointsCost);
    setRedeemedName(selectedReward.name);
    setShowRedeemModal(false);
    setTimeout(() => setShowSuccessModal(true), 300);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold text-text-dark">Spend Points</Text>
        <Text className="text-text-soft text-sm mt-0.5">Redeem your City Rewards</Text>
      </View>

      {/* Balance card */}
      <View className="mx-5 mb-4">
        <View
          className="bg-primary rounded-2xl p-5 flex-row items-center justify-between"
          style={{ shadowColor: '#1A5F4F', shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 }}
        >
          <View>
            <Text className="text-white/70 text-sm">Available balance</Text>
            <Text className="text-white text-3xl font-bold mt-1">{userPoints}</Text>
            <Text className="text-white/80 text-sm">City Rewards</Text>
          </View>
          <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
            <Text style={{ fontSize: 32 }}>🌿</Text>
          </View>
        </View>
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8, marginBottom: 4 }}
        className="mb-4"
        style={{ flexGrow: 0 }}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full ${
              activeCategory === cat.id
                ? 'bg-primary'
                : 'bg-white border border-gray-200'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeCategory === cat.id ? 'text-white' : 'text-text-mid'
              }`}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rewards grid */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}>
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {filtered.map((reward) => {
            const canAfford = userPoints >= reward.pointsCost;
            return (
              <TouchableOpacity
                key={reward.id}
                onPress={() => handleRewardPress(reward)}
                activeOpacity={reward.available ? 0.85 : 1}
                style={{ width: '47%' }}
              >
                <View
                  className={`bg-white rounded-2xl p-4 ${!reward.available ? 'opacity-50' : ''}`}
                  style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
                >
                  <View className="items-center mb-3">
                    <View className="w-16 h-16 rounded-2xl bg-cream items-center justify-center">
                      <Text style={{ fontSize: 32 }}>{reward.emoji}</Text>
                    </View>
                  </View>
                  <Text className="text-text-dark font-bold text-sm mb-1" numberOfLines={2}>
                    {reward.name}
                  </Text>
                  <Text className="text-text-soft text-xs mb-3" numberOfLines={2}>
                    {reward.description}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View className={`px-3 py-1 rounded-full ${canAfford && reward.available ? 'bg-primary-pale' : 'bg-gray-100'}`}>
                      <Text className={`text-sm font-bold ${canAfford && reward.available ? 'text-primary' : 'text-text-soft'}`}>
                        {reward.pointsCost} pts
                      </Text>
                    </View>
                    {!reward.available && (
                      <Text className="text-text-soft text-xs">Coming soon</Text>
                    )}
                    {reward.available && !canAfford && (
                      <Ionicons name="lock-closed-outline" size={14} color="#888880" />
                    )}
                    {reward.available && canAfford && (
                      <Ionicons name="arrow-forward-circle-outline" size={20} color="#1A5F4F" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <RedeemModal
        reward={selectedReward}
        visible={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
        onConfirm={handleConfirmRedeem}
        userPoints={userPoints}
      />

      <SuccessModal
        visible={showSuccessModal}
        reward={redeemedName}
        onClose={() => setShowSuccessModal(false)}
      />
    </SafeAreaView>
  );
}
