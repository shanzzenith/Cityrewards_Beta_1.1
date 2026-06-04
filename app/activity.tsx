import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_ACTIVITY, MOCK_USER } from '../constants/mockData';

const SOURCE_LABELS: Record<string, string> = {
  welcome_bonus: 'Welcome Bonus',
  phone_bonus: 'Phone Verification Bonus',
  push_opt_in: 'Notification Bonus',
  scan: 'Reusable Cup Scan',
  purchase: 'Purchase Reward',
  redemption: 'Reward Redeemed',
  admin_adjustment: 'Admin Adjustment',
  expiry: 'Points Expired',
  reversal: 'Reversal',
};

const SOURCE_ICONS: Record<string, { icon: keyof typeof Ionicons.glyphMap; bg: string; color: string }> = {
  welcome_bonus: { icon: 'gift-outline', bg: '#E8F3F0', color: '#1A5F4F' },
  phone_bonus: { icon: 'phone-portrait-outline', bg: '#E8F3F0', color: '#1A5F4F' },
  push_opt_in: { icon: 'notifications-outline', bg: '#E8F3F0', color: '#1A5F4F' },
  scan: { icon: 'qr-code-outline', bg: '#E8F3F0', color: '#1A5F4F' },
  purchase: { icon: 'cart-outline', bg: '#E8F3F0', color: '#1A5F4F' },
  redemption: { icon: 'cafe-outline', bg: '#FEF3F2', color: '#E53E3E' },
  admin_adjustment: { icon: 'shield-checkmark-outline', bg: '#E8F3F0', color: '#1A5F4F' },
  expiry: { icon: 'time-outline', bg: '#FEF3F2', color: '#E53E3E' },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
}

export default function ActivityScreen() {
  const totalEarned = MOCK_ACTIVITY.filter((t) => t.entryType === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalSpent = MOCK_ACTIVITY.filter((t) => t.entryType === 'debit').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Summary cards */}
        <View className="flex-row px-5 pt-4 pb-4 gap-3">
          <View className="flex-1 bg-primary rounded-2xl p-4"
            style={{ shadowColor: '#1A5F4F', shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 }}
          >
            <Text className="text-white/70 text-xs mb-1">Total Earned</Text>
            <Text className="text-white text-xl font-bold">+{totalEarned}</Text>
            <Text className="text-white/70 text-xs">City Rewards</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4"
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
          >
            <Text className="text-text-soft text-xs mb-1">Total Spent</Text>
            <Text className="text-text-dark text-xl font-bold">{totalSpent}</Text>
            <Text className="text-text-soft text-xs">City Rewards</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4"
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
          >
            <Text className="text-text-soft text-xs mb-1">Balance</Text>
            <Text className="text-text-dark text-xl font-bold">{MOCK_USER.cityRewardsBalance}</Text>
            <Text className="text-text-soft text-xs">City Rewards</Text>
          </View>
        </View>

        {/* Transaction list */}
        <Text className="px-5 font-bold text-base text-text-dark mb-3">Transaction History</Text>

        <View className="mx-5 bg-white rounded-2xl overflow-hidden"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
        >
          {MOCK_ACTIVITY.map((tx, index) => {
            const iconInfo = SOURCE_ICONS[tx.sourceType] ?? SOURCE_ICONS.welcome_bonus;
            const isCredit = tx.entryType === 'credit';

            return (
              <View key={tx.id}>
                <View className="flex-row items-center px-4 py-4">
                  {/* Icon */}
                  <View
                    className="w-11 h-11 rounded-full items-center justify-center mr-3 flex-shrink-0"
                    style={{ backgroundColor: iconInfo.bg }}
                  >
                    <Ionicons name={iconInfo.icon} size={20} color={iconInfo.color} />
                  </View>

                  {/* Details */}
                  <View className="flex-1">
                    <Text className="text-text-dark font-semibold text-sm">
                      {SOURCE_LABELS[tx.sourceType] ?? tx.description}
                    </Text>
                    {tx.cafeName && (
                      <Text className="text-text-soft text-xs mt-0.5">{tx.cafeName}</Text>
                    )}
                    <Text className="text-text-soft text-xs mt-0.5">{formatDate(tx.createdAt)}</Text>
                  </View>

                  {/* Amount */}
                  <View className="items-end">
                    <Text
                      className={`font-bold text-base ${isCredit ? 'text-primary' : 'text-red-500'}`}
                    >
                      {isCredit ? '+' : ''}{tx.amount}
                    </Text>
                    <Text className="text-text-soft text-xs">{tx.runningBalance} bal</Text>
                  </View>
                </View>
                {index < MOCK_ACTIVITY.length - 1 && (
                  <View className="h-px bg-gray-100 ml-16" />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
