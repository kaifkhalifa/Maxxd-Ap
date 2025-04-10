import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { HapticTab } from '@/components/HapticTab';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  const router = useRouter();

  // Check if user is authenticated, redirect to sign in if not
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/sign-in" as any);
    }
  }, [user, loading, router]);

  // Show nothing while checking auth
  if (loading || !user) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            intensity={80}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="ai-coach"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="barbell-outline" color={color} />,
          tabBarLabel: 'AI Coach',
        }}
      />
      <Tabs.Screen
        name="glow-up"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="sparkles" color={color} />,
          tabBarLabel: 'Glow Up',
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="people-outline" color={color} />,
          tabBarLabel: 'Community',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
