import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIEWFINDER_SIZE = SCREEN_WIDTH - 80;

function ScannerFrame() {
  const cornerSize = 24;
  const cornerWidth = 3;
  const cornerColor = '#00E5CC';

  return (
    <View
      style={{
        width: VIEWFINDER_SIZE,
        height: VIEWFINDER_SIZE,
        position: 'relative',
      }}
    >
      {/* Top-left */}
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <View style={{ width: cornerSize, height: cornerWidth, backgroundColor: cornerColor, borderRadius: 2 }} />
        <View style={{ width: cornerWidth, height: cornerSize, backgroundColor: cornerColor, borderRadius: 2 }} />
      </View>
      {/* Top-right */}
      <View style={{ position: 'absolute', top: 0, right: 0, alignItems: 'flex-end' }}>
        <View style={{ width: cornerSize, height: cornerWidth, backgroundColor: cornerColor, borderRadius: 2 }} />
        <View style={{ width: cornerWidth, height: cornerSize, backgroundColor: cornerColor, borderRadius: 2, alignSelf: 'flex-end' }} />
      </View>
      {/* Bottom-left */}
      <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <View style={{ width: cornerWidth, height: cornerSize, backgroundColor: cornerColor, borderRadius: 2 }} />
        <View style={{ width: cornerSize, height: cornerWidth, backgroundColor: cornerColor, borderRadius: 2 }} />
      </View>
      {/* Bottom-right */}
      <View style={{ position: 'absolute', bottom: 0, right: 0, alignItems: 'flex-end' }}>
        <View style={{ width: cornerWidth, height: cornerSize, backgroundColor: cornerColor, borderRadius: 2, alignSelf: 'flex-end' }} />
        <View style={{ width: cornerSize, height: cornerWidth, backgroundColor: cornerColor, borderRadius: 2 }} />
      </View>
    </View>
  );
}

function ScanLine() {
  const translateY = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: VIEWFINDER_SIZE - 4,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#00E5CC',
        opacity: 0.8,
        transform: [{ translateY }],
        shadowColor: '#00E5CC',
        shadowOpacity: 0.8,
        shadowRadius: 4,
      }}
    />
  );
}

function SuccessModal({
  visible,
  onClose,
  points,
}: {
  visible: boolean;
  onClose: () => void;
  points: number;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 items-center justify-center px-8">
        <View
          className="bg-white rounded-3xl p-8 items-center w-full"
          style={{ shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 }}
        >
          <View className="w-20 h-20 rounded-full bg-primary-pale items-center justify-center mb-4">
            <Text style={{ fontSize: 40 }}>🎉</Text>
          </View>
          <Text className="text-2xl font-bold text-text-dark mb-2">+{points} Points!</Text>
          <Text className="text-text-soft text-center mb-6">
            Reusable cup bonus added to your wallet.
          </Text>
          <View className="w-full h-px bg-gray-100 mb-5" />
          <View className="flex-row items-center mb-5">
            <View className="flex-1 items-center">
              <Text className="text-text-soft text-xs mb-1">Earned at</Text>
              <Text className="text-text-dark font-semibold text-sm">Aurora Coffee</Text>
            </View>
            <View className="w-px h-8 bg-gray-100" />
            <View className="flex-1 items-center">
              <Text className="text-text-soft text-xs mb-1">New balance</Text>
              <Text className="text-primary font-bold text-sm">{110 + points} pts</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="bg-primary rounded-xl py-3.5 w-full items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-semibold text-base">Great, thanks!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function ScanScreen() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedPoints] = useState(50);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scan success after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-start justify-between px-5 pt-4 pb-3">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-text-dark">Scan to earn</Text>
          <Text className="text-text-soft text-sm mt-0.5">
            Scan the QR code at the counter to earn points.
          </Text>
        </View>
        <TouchableOpacity className="relative ml-3">
          <View className="w-10 h-10 rounded-full bg-primary-pale items-center justify-center">
            <Ionicons name="person-outline" size={20} color="#1A5F4F" />
          </View>
          <View className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>

      {/* Info pills */}
      <View className="px-5 mb-5 gap-2">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={15} color="#4A4A4A" />
          <Text className="text-text-mid text-sm ml-1.5">
            Location helps us verify you're at the right cafe.
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="cafe-outline" size={15} color="#4A4A4A" />
          <Text className="text-text-mid text-sm ml-1.5">
            Bring your own cup and show it to staff if requested.
          </Text>
        </View>
      </View>

      {/* Camera viewfinder */}
      <View className="flex-1 mx-5 mb-6 rounded-2xl overflow-hidden bg-gray-900 items-center justify-center">
        {/* Simulated camera view */}
        <View className="absolute inset-0 bg-gray-800">
          {/* Simulated blurry background */}
          <View className="absolute inset-0 items-center justify-center">
            <View className="w-full h-px bg-gray-600 opacity-30" style={{ top: '33%' }} />
            <View className="w-full h-px bg-gray-600 opacity-30" style={{ top: '66%' }} />
          </View>
        </View>

        {/* Dark overlay corners */}
        <View className="absolute inset-0">
          {/* Top overlay */}
          <View className="absolute top-0 left-0 right-0 bg-black/60"
            style={{ height: (Dimensions.get('window').height - 400) / 4 }} />
          {/* Bottom overlay */}
          <View className="absolute bottom-0 left-0 right-0 bg-black/60"
            style={{ height: (Dimensions.get('window').height - 400) / 4 }} />
        </View>

        {/* Viewfinder */}
        <View className="items-center justify-center" style={{ width: VIEWFINDER_SIZE, height: VIEWFINDER_SIZE }}>
          {/* Semi-transparent overlay around viewfinder */}
          <ScannerFrame />
          {isScanning && <ScanLine />}

          {/* QR placeholder in center */}
          <View
            className="absolute inset-4 items-center justify-center bg-white/10 rounded-xl"
          >
            {isScanning ? (
              <View className="items-center">
                <Ionicons name="scan-outline" size={60} color="rgba(255,255,255,0.6)" />
                <Text className="text-white text-sm mt-2 opacity-70">Scanning...</Text>
              </View>
            ) : (
              <View className="items-center">
                <Ionicons name="qr-code-outline" size={80} color="rgba(255,255,255,0.3)" />
                <Text className="text-white text-sm mt-2 opacity-50">Point at QR code</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Scan button */}
      <View className="px-5 pb-4">
        <TouchableOpacity
          onPress={handleScan}
          disabled={isScanning}
          className={`rounded-xl py-4 items-center flex-row justify-center ${
            isScanning ? 'bg-primary/60' : 'bg-primary'
          }`}
          activeOpacity={0.85}
        >
          <Ionicons name="qr-code-outline" size={20} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-semibold text-base">
            {isScanning ? 'Scanning...' : 'Scan QR Code'}
          </Text>
        </TouchableOpacity>
      </View>

      <SuccessModal
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
        points={earnedPoints}
      />
    </SafeAreaView>
  );
}
