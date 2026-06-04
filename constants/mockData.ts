import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { MOCK_USER, MOCK_NEARBY_STORES, MOCK_REWARDS } from '../../constants/mockData';

function PointsRing({ points, size = 130 }: { points: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(points / 200, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E8F3F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1A5F4F"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#1A1A1A' }}>
          {points}
        </Text>
        <Text style={{ fontSize: 12, color: '#4A4A4A', fontWeight: '500' }}>
          City Rewards
        </Text>
      </View>
    </View>
  );
}

function StatBadge({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <View
      className="bg-white rounded-2xl px-3 py-2.5 mb-2"
      style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
    >
      <View className="flex-row items-center">
        <Text className="text-lg mr-1.5">{icon}</Text>
        <View>
          <Text className="text-text-dark font-bold text-sm">{value}</Text>
          <Text className="text-text-soft text-xs">{label}</Text>
        </View>
      </View>
    </View>
  );
}

function StoreCard({
  store,
  onPress,
}: {
  store: typeof MOCK_NEARBY_STORES[0];
  onPress: () => void;
}) {
  const imageSource =
    typeof store.image === 'string' && store.image.length > 0
      ? { uri: store.image }
      : { uri: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80' };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-3"
      activeOpacity={0.85}
      style={{ width: 130 }}
    >
      <View className="rounded-2xl overflow-hidden" style={{ height: 100 }}>
        <Image source={imageSource} className="w-full h-full" resizeMode="cover" />

        <View
          className="absolute top-2 right-2 bg-white w-7 h-7 rounded-full items-center justify-center"
          style={{ shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 4, elevation: 2 }}
        >
          <Text style={{ fontSize: 14 }}>☕</Text>
        </View>

        {!store.isOpen && (
          <View className="absolute inset-0 bg-black/40 items-center justify-center">
            <Text className="text-white text-xs font-semibold">Closed</Text>
          </View>
        )}
      </View>

      <Text className="text-text-dark font-semibold text-sm mt-1.5" numberOfLines={1}>
        {store.name}
      </Text>

      <View className="flex-row items-center mt-0.5">
        <Ionicons name="location-outline" size={11} color="#888880" />
        <Text className="text-text-soft text-xs ml-0.5">{store.distance}</Text>
      </View>
    </TouchableOpacity>
  );
}

function MapView() {
  return (
    <View
      className="mx-4 rounded-2xl overflow-hidden"
      style={{ height: 160, backgroundColor: '#E8EFE8' }}
    >
      <View className="absolute inset-0 bg-green-50 items-center justify-center">
        <View className="absolute inset-0" style={{ opacity: 0.3 }}>
          {[0.3, 0.5, 0.7].map((pos) => (
            <View
              key={`h-${pos}`}
              className="absolute left-0 right-0 h-px bg-gray-400"
              style={{ top: `${pos * 100}%` }}
            />
          ))}
          {[0.25, 0.5, 0.75].map((pos) => (
            <View
              key={`v-${pos}`}
              className="absolute top-0 bottom-0 w-px bg-gray-400"
              style={{ left: `${pos * 100}%` }}
            />
          ))}
        </View>

        <View className="absolute" style={{ top: '30%', left: '30%' }}>
          <MapPin />
        </View>
        <View className="absolute" style={{ top: '55%', left: '55%' }}>
          <MapPin />
        </View>
        <View className="absolute" style={{ top: '40%', left: '68%' }}>
          <ShopPin />
        </View>
      </View>
    </View>
  );
}

function MapPin() {
  return (
    <View className="items-center">
      <View
        className="w-8 h-8 rounded-full bg-primary items-center justify-center"
        style={{ shadowColor: '#1A5F4F', shadowOpacity: 0.4, shadowRadius: 6, elevation: 4 }}
      >
        <Text style={{ fontSize: 14 }}>☕</Text>
      </View>
      <View
        className="w-2 h-2 bg-primary rounded-full mt-0.5"
        style={{ transform: [{ rotate: '45deg' }] }}
      />
    </View>
  );
}

function ShopPin() {
  return (
    <View className="items-center">
      <View
        className="w-8 h-8 rounded-full bg-primary-light items-center justify-center"
        style={{ shadowColor: '#2D7A67', shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }}
      >
        <Text style={{ fontSize: 14 }}>🏪</Text>
      </View>
    </View>
  );
}

function RewardCard({
  name,
  points,
  emoji,
}: {
  name: string;
  points: number;
  emoji: string;
}) {
  return (
    <View
      className="bg-white rounded-2xl p-4 mr-3 items-center"
      style={{ width: 120, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
    >
      <View className="w-14 h-14 rounded-2xl bg-cream items-center justify-center mb-2">
        <Text style={{ fontSize: 28 }}>{emoji}</Text>
      </View>
      <Text className="text-text-dark font-semibold text-sm text-center" numberOfLines={2}>
        {name}
      </Text>
      <Text className="text-primary font-bold text-sm mt-1">{points} pts</Text>
    </View>
  );
}

export default function EarnScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
          <Text className="text-2xl font-bold text-text-dark">
            Hello, {MOCK_USER.name}!
          </Text>

          <TouchableOpacity onPress={() => {}} className="relative">
            <View className="w-10 h-10 rounded-full bg-primary-pale items-center justify-center">
              <Ionicons name="person-outline" size={20} color="#1A5F4F" />
            </View>
            <View className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-cream" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center px-5 mb-5">
          <View className="flex-1 mr-4">
            <StatBadge icon="💧" value={`${MOCK_USER.waterSavedLitres} L`} label="water saved" />
            <StatBadge icon="♻️" value={`${MOCK_USER.wasteAvoidedKg} kg`} label="waste avoided" />
            <StatBadge icon="☁️" value={`${MOCK_USER.co2PreventedKg} kg`} label="CO2 prevented" />
          </View>

          <View className="items-center">
            <PointsRing points={MOCK_USER.cityRewardsBalance} />
            <TouchableOpacity
              onPress={() => router.push('/activity')}
              className="flex-row items-center mt-3"
            >
              <Ionicons name="trending-up-outline" size={14} color="#1A5F4F" />
              <Text className="text-primary text-sm font-semibold ml-1">Activity</Text>
              <Ionicons name="chevron-forward" size={14} color="#1A5F4F" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-4">
          <View className="flex-row items-center justify-between px-5 mb-3">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#1A1A1A" />
              <Text className="text-text-dark font-bold text-base ml-1">Places to earn nearby</Text>
            </View>

            <TouchableOpacity className="flex-row items-center">
              <Text className="text-primary text-sm font-semibold">View all</Text>
              <Ionicons name="chevron-forward" size={14} color="#1A5F4F" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
          >
            {MOCK_NEARBY_STORES.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onPress={() => router.push(`/store/${store.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        <MapView />

        <Text className="text-text-soft text-xs px-5 mt-2 mb-5 leading-4">
          Discover places to earn City Rewards near you.{'\n'}(We are adding more places)
        </Text>

        <View className="mb-2">
          <View className="flex-row items-center px-5 mb-3">
            <Ionicons name="diamond-outline" size={16} color="#1A1A1A" />
            <Text className="text-text-dark font-bold text-base ml-1">Ways to spend your points</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
          >
            {MOCK_REWARDS.filter((r) => r.available).map((reward) => (
              <RewardCard
                key={reward.id}
                name={reward.name}
                points={reward.pointsCost}
                emoji={reward.emoji}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}