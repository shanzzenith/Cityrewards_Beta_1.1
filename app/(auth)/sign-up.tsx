import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LeafLogo from '../../components/LeafLogo';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleCreateAccount = () => {
    router.replace('/(auth)/notifications');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const inputClass = (field: string) =>
    `flex-row items-center border rounded-xl px-4 py-3.5 mb-4 ${
      focusedField === field
        ? 'border-primary bg-white'
        : 'border-gray-200 bg-white'
    }`;

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo badge */}
          <View className="items-center mt-8 mb-4">
            <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm"
              style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
            >
              <LeafLogo size={22} color="#1A5F4F" />
              <Text className="ml-2 text-primary font-semibold text-base">City Rewards</Text>
            </View>
          </View>

          {/* Headline */}
          <View className="px-6 mb-5">
            <Text className="text-3xl font-bold text-text-dark text-center leading-tight">
              Bring your own cup{'\n'}& get rewarded
            </Text>
          </View>

          {/* Hero image */}
          <View className="px-6 mb-7">
            <View className="rounded-2xl overflow-hidden" style={{ height: 200 }}>
              <Image
                source={require('../../assets/hero-cup.png')}
                resizeMode="cover"
              />
              {/* Points overlay card */}
              <View
                className="absolute right-4 bottom-4 bg-white rounded-2xl p-3 items-center"
                style={{ shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 5 }}
              >
                <View className="w-14 h-14 rounded-full bg-primary items-center justify-center mb-1">
                  <Text className="text-white text-lg font-bold">+50</Text>
                  <Text className="text-white text-xs">Points</Text>
                </View>
                <Text className="text-xs text-text-mid font-medium">Green Level</Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <View className="px-6">
            {/* Name */}
            <Text className="text-sm font-medium text-text-dark mb-1.5">Name</Text>
            <View className={inputClass('name')}>
              <Ionicons name="person-outline" size={18} color="#888880" />
              <TextInput
                className="flex-1 ml-3 text-text-dark text-base"
                placeholder="Enter your name"
                placeholderTextColor="#C0BFB8"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
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

            {/* Password */}
            <Text className="text-sm font-medium text-text-dark mb-1.5">Password</Text>
            <View className={inputClass('password')}>
              <Ionicons name="lock-closed-outline" size={18} color="#888880" />
              <TextInput
                className="flex-1 ml-3 text-text-dark text-base"
                placeholder="Create a password"
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

            {/* CTA */}
            <TouchableOpacity
              onPress={handleCreateAccount}
              className="bg-primary rounded-xl py-4 items-center mt-2"
              activeOpacity={0.85}
            >
              <Text className="text-white font-semibold text-base">Create Account</Text>
            </TouchableOpacity>

            {/* Social divider */}
            <View className="flex-row items-center my-5">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-3 text-text-soft text-sm">or sign up with</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social buttons */}
            <View className="flex-row gap-3">
              <SocialButton icon="logo-apple" label="Apple" onPress={() => {}} />
              <SocialButton icon="logo-google" label="Google" onPress={() => {}} color="#EA4335" />
              <SocialButton icon="logo-facebook" label="Facebook" onPress={() => {}} color="#1877F2" />
            </View>

            {/* Login link */}
            <TouchableOpacity onPress={handleLogin} className="items-center mt-6">
              <Text className="text-primary font-semibold text-sm">Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
  color = '#1A1A1A',
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row items-center justify-center border border-gray-200 bg-white rounded-xl py-3"
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={18} color={color} />
      <Text className="ml-2 text-text-dark font-medium text-sm">{label}</Text>
    </TouchableOpacity>
  );
}
