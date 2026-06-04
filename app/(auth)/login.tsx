import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image, // Added Image import here
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LeafLogo from '../../components/LeafLogo';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = () => {
    router.replace('/(tabs)/earn');
  };

  const inputClass = (field: string) =>
    `flex-row items-center border rounded-xl px-4 py-3.5 mb-4 ${
      focusedField === field ? 'border-primary bg-white' : 'border-gray-200 bg-white'
    }`;

 
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} className="mt-4 ml-4 mb-2 p-2 w-10">
            <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          {/* Logo and Welcome Text */}
          <View className="items-center mb-6">
            <View className="flex-row items-center mb-4">
              <LeafLogo size={32} />
              <Text className="ml-2 text-primary text-xl font-bold">CityRewards</Text>
            </View>
            <Text className="text-2xl font-bold text-text-dark">Welcome back</Text>
            <Text className="text-text-soft mt-1">Sign in to your account</Text>
          </View>

          {/* Hero Image Section */}
          <View className="px-6 mb-8 mt-2">
            <View className="rounded-3xl overflow-hidden w-full h-48 bg-gray-200">
              <Image 
                source={require('../../assets/hero-cup.png')} 
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Form Fields */}
          <View className="px-6">
            <Text className="text-sm font-medium text-text-dark mb-1.5">Email</Text>
            <View className={inputClass('email')}>
              <Ionicons name="mail-outline" size={18} color="#888880" />
              <TextInput
                className="flex-1 ml-3 text-text-dark text-base"
                placeholder="Enter your email"
                placeholderTextColor="#C0BFB8"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text className="text-sm font-medium text-text-dark mb-1.5">Password</Text>
            <View className={inputClass('password')}>
              <Ionicons name="lock-closed-outline" size={18} color="#888880" />
              <TextInput
                className="flex-1 ml-3 text-text-dark text-base"
                placeholder="Enter your password"
                placeholderTextColor="#C0BFB8"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color="#888880"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="items-end mb-5">
              <Text className="text-primary text-sm font-medium">Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-primary rounded-xl py-4 items-center"
              activeOpacity={0.85}
            >
              <Text className="text-white font-semibold text-base">Log In</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-text-soft">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/sign-up')}>
                <Text className="text-primary font-semibold">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}