import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="activity"
          options={{
            headerShown: true,
            title: 'Activity',
            headerStyle: { backgroundColor: '#F5F4EF' },
            headerTintColor: '#1A1A1A',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="store/[id]"
          options={{
            headerShown: true,
            title: '',
            headerStyle: { backgroundColor: '#F5F4EF' },
            headerTintColor: '#1A1A1A',
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
