import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

function LeafIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C7 2 3.5 7 3.5 12c0 2.5.9 4.8 2.5 6.5C7.5 20.3 9.7 21.5 12 21.5c1.2 0 2.3-.3 3.2-1 1-.8 1.8-1.8 2.2-3.2C18.8 15 18.8 12 17 8.5c-1-2-2.8-4.5-5-6.5z"
        fill={color}
      />
      <Path
        d="M12 5v14M12 5C10.2 8 8.5 11 8.5 14M12 5C13.8 8 15.5 11 15.5 14"
        stroke="white"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ScanIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth={1.8} />
      <Rect x="16" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth={1.8} />
      <Rect x="3" y="16" width="5" height="5" rx="1" stroke={color} strokeWidth={1.8} />
      <Path d="M16 16h2v2h-2zM20 16v2M16 20h2M20 20v-2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M3 12h18" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function GiftIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="10" width="18" height="11" rx="1.5" stroke={color} strokeWidth={1.8} />
      <Path d="M3 10h18M12 10V21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path
        d="M8.5 10C7.12 10 6 8.88 6 7.5S7.12 5 8.5 5C10.5 5 12 10 12 10s-1.5-5 0-5c1.38 0 2.5 1.12 2.5 2.5S13.38 10 12 10"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function TabBarLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: focused ? '600' : '400',
        color: focused ? '#1A5F4F' : '#888880',
        marginTop: 2,
      }}
    >
      {label}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#ECEAE3',
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#1A5F4F',
        tabBarInactiveTintColor: '#888880',
      }}
    >
      <Tabs.Screen
        name="earn"
        options={{
          title: 'Earn',
          tabBarIcon: ({ focused }) => (
            <LeafIcon color={focused ? '#1A5F4F' : '#888880'} />
          ),
          tabBarLabel: ({ focused }) => <TabBarLabel label="Earn" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: focused ? '#1A5F4F' : '#2D7A67',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                shadowColor: '#1A5F4F',
                shadowOpacity: 0.4,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 6,
              }}
            >
              <ScanIcon color="white" size={24} />
            </View>
          ),
          tabBarLabel: ({ focused }) => <TabBarLabel label="Scan" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="spend"
        options={{
          title: 'Spend',
          tabBarIcon: ({ focused }) => (
            <GiftIcon color={focused ? '#1A5F4F' : '#888880'} />
          ),
          tabBarLabel: ({ focused }) => <TabBarLabel label="Spend" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
