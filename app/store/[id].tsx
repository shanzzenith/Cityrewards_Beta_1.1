import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_NEARBY_STORES } from '../../constants/mockData';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const store = MOCK_NEARBY_STORES.find((s) => s.id === id) ?? MOCK_NEARBY_STORES[0];

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero image */}
        <View style={{ height: 220 }}>
        <Image 
source={
  typeof store.image === 'string' && store.image.length > 0 
    ? [{ uri: store.image }] 
    : [{ uri: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000' }]
}
  className="w-full h-full" 
  resizeMode="cover" 
/>
<View className="absolute inset-0 bg-black/20" />
          {/* Open badge */}
          <View className={`absolute top-4 right-4 px-3 py-1 rounded-full ${store.isOpen ? 'bg-green-500' : 'bg-gray-500'}`}>
            <Text className="text-white text-xs font-semibold">
              {store.isOpen ? `Open · until ${store.openUntil}` : 'Closed'}
            </Text>
          </View>
        </View>

        {/* Info card */}
        <View className="mx-4 -mt-6 bg-white rounded-2xl p-5"
          style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 }}
        >
          <Text className="text-2xl font-bold text-text-dark mb-1">{store.name}</Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#888880" />
            <Text className="text-text-soft text-sm ml-1">{store.address} · {store.distance}</Text>
          </View>

          <View className="flex-row mt-4 gap-3">
            <View className="flex-1 bg-cream rounded-xl p-3 items-center">
              <Text className="text-primary font-bold text-lg">+{store.pointsPerVisit}</Text>
              <Text className="text-text-soft text-xs mt-0.5">pts per visit</Text>
            </View>
            <View className="flex-1 bg-cream rounded-xl p-3 items-center">
              <Text className="text-text-dark font-bold text-lg">☕</Text>
              <Text className="text-text-soft text-xs mt-0.5">Reusable cup</Text>
            </View>
          </View>
        </View>

        {/* How to earn */}
        <View className="mx-4 mt-4 bg-white rounded-2xl p-5"
          style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 }}
        >
          <Text className="font-bold text-base text-text-dark mb-3">How to earn points</Text>
          {[
            { icon: 'cafe-outline', text: 'Bring your reusable cup' },
            { icon: 'qr-code-outline', text: 'Scan the QR code at the counter' },
            { icon: 'checkmark-circle-outline', text: `Earn +${store.pointsPerVisit} City Rewards instantly` },
          ].map((step, i) => (
            <View key={i} className="flex-row items-center mb-3">
              <View className="w-9 h-9 rounded-full bg-primary-pale items-center justify-center mr-3">
                <Ionicons name={step.icon as any} size={18} color="#1A5F4F" />
              </View>
              <Text className="text-text-mid text-sm flex-1">{step.text}</Text>
            </View>
          ))}
        </View>

        {/* Scan CTA */}
        <View className="mx-4 mt-4">
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/scan')}
            className="bg-primary rounded-xl py-4 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-semibold text-base">Scan QR Code Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
