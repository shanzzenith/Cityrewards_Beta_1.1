import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LeafLogo from '../../components/LeafLogo';

const STEPS = [
  {
    number: '1',
    title: 'Step 1',
    icon: 'share-outline' as const,
    description: (
      <>
        Tap the <Text style={{ fontWeight: '700' }}>Share</Text> icon{'\n'}at the bottom of Safari
      </>
    ),
  },
  {
    number: '2',
    title: 'Step 2',
    icon: 'add-outline' as const,
    description: (
      <>
        Scroll down and tap{'\n'}
        <Text style={{ fontWeight: '700' }}>Add to Home Screen</Text>
      </>
    ),
  },
  {
    number: '3',
    title: 'Step 3',
    icon: 'phone-portrait-outline' as const,
    description: (
      <>
        Open the app from your{'\n'}home screen to allow{'\n'}notifications.
      </>
    ),
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const handleGotIt = () => {
    router.replace('/(tabs)/earn');
  };

  const handleDismiss = () => {
    router.replace('/(tabs)/earn');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center pt-6 pb-4">
          <Text className="text-xl font-bold text-text-dark">Enable Notifications</Text>
        </View>

        {/* Logo */}
        <View className="items-center mb-4">
          <View className="flex-row items-center">
            <LeafLogo size={32} color="#1A5F4F" />
            <Text className="ml-2 text-primary text-xl font-bold">CityRewards</Text>
          </View>
        </View>

        {/* Illustration */}
        <View className="mx-6 mb-6 rounded-2xl overflow-hidden bg-primary-pale" style={{ height: 200 }}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80' }}
            className="w-full h-full"
            resizeMode="cover"
            style={{ opacity: 0.6 }}
          />
          {/* Notification card overlay */}
          <View
            className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-3 flex-row items-center"
            style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}
          >
            <View className="w-10 h-10 bg-primary-pale rounded-xl items-center justify-center mr-3">
              <Text className="text-xl">🎁</Text>
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text className="font-semibold text-text-dark text-sm">City Rewards</Text>
                <Text className="text-text-soft text-xs">now</Text>
              </View>
              <Text className="text-text-mid text-xs">New coffee shop nearby!</Text>
              <Text className="text-text-mid text-xs">You earned 50 points 🎉</Text>
            </View>
          </View>
        </View>

        {/* Headline */}
        <View className="px-6 mb-2">
          <Text className="text-2xl font-bold text-text-dark text-center">
            Never miss a reward
          </Text>
          <Text className="text-text-soft text-center mt-2 leading-5">
            Get an extra 60 City Rewards for enabling{'\n'}
            notifications, plus hear about new local merchants.
          </Text>
        </View>

        {/* Steps */}
        <View className="mx-6 mt-5 bg-gray-50 rounded-2xl overflow-hidden">
          {STEPS.map((step, index) => (
            <View key={step.number}>
              <View className="flex-row items-start px-4 py-4">
                {/* Step number badge */}
                <View className="w-7 h-7 rounded-full bg-primary items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <Text className="text-white text-xs font-bold">{step.number}</Text>
                </View>
                {/* Icon circle */}
                <View className="w-11 h-11 rounded-full bg-white items-center justify-center mr-4 flex-shrink-0"
                  style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
                >
                  <Ionicons name={step.icon} size={20} color="#1A5F4F" />
                </View>
                {/* Text */}
                <View className="flex-1">
                  <Text className="font-bold text-text-dark text-sm mb-0.5">{step.title}</Text>
                  <Text className="text-text-mid text-sm leading-5">{step.description}</Text>
                </View>
              </View>
              {index < STEPS.length - 1 && (
                <View className="h-px bg-gray-200 ml-4" />
              )}
            </View>
          ))}
        </View>

        {/* CTA */}
        <View className="px-6 mt-6">
          <TouchableOpacity
            onPress={handleGotIt}
            className="bg-primary rounded-xl py-4 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-semibold text-base">Got it</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDismiss} className="items-center mt-4">
            <Text className="text-primary font-semibold text-sm">Dismiss</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
