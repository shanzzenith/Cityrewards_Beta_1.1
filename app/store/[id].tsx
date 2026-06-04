import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_NEARBY_STORES } from '../../constants/mockData';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const store = MOCK_NEARBY_STORES.find((s) => s.id === id);

  if (!store) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <Text className="text-text-dark text-base font-semibold">Store not found</Text>
      </SafeAreaView>
    );
  }

  const heroImageSource =
    typeof store.image === 'string' &&
    store.image.trim().length > 0 &&
    store.image.startsWith('http')
      ? { uri: store.image }
      : { uri: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80' };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <View className="w-full h-64 bg-gray-200">
            <Image
              source={heroImageSource}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white items-center justify-center"
            style={{ shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 3 }}
          >
            <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <View className="px-5 py-5">
          <Text className="text-2xl font-bold text-text-dark">{store.name}</Text>

          <View className="flex-row items-center mt-2">
            <Ionicons name="location-outline" size={16} color="#888880" />
            <Text className="text-text-soft ml-1">{store.address}</Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Ionicons name="walk-outline" size={16} color="#888880" />
            <Text className="text-text-soft ml-1">{store.distance} away</Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Ionicons
              name={store.isOpen ? 'time-outline' : 'close-circle-outline'}
              size={16}
              color={store.isOpen ? '#1A5F4F' : '#B45309'}
            />
            <Text
              className="ml-1 font-medium"
              style={{ color: store.isOpen ? '#1A5F4F' : '#B45309' }}
            >
              {store.isOpen ? `Open until ${store.openUntil}` : 'Currently closed'}
            </Text>
          </View>

          <View className="bg-white rounded-2xl p-4 mt-5">
            <Text className="text-text-dark font-semibold text-base">Rewards</Text>
            <Text className="text-text-soft mt-1">
              Earn {store.pointsPerVisit} City Rewards points when you bring your own cup.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}