import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

export default function UserProfileHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Function to trigger haptic feedback safely (checking platform)
  const triggerHaptic = async (type: Haptics.NotificationFeedbackType) => {
    try {
      // Only use haptics on native platforms
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(type);
      }
    } catch (error) {
      // Silently fail if haptics aren't available
      console.log('Haptics not available');
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => triggerHaptic(Haptics.NotificationFeedbackType.Warning),
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await triggerHaptic(Haptics.NotificationFeedbackType.Success);
              await signOut();
              router.replace("/auth/sign-in" as any);
            } catch (error) {
              console.error('Error signing out:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        
        <View>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.email}>{user?.displayName || user?.email || 'User'}</Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Ionicons name="log-out-outline" size={22} color={Colors.light.tint} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileInitial: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  greeting: {
    color: '#999',
    fontSize: 14,
  },
  email: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  signOutButton: {
    padding: 8,
  },
}); 