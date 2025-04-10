import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If user is already authenticated, redirect to main app
  useEffect(() => {
    if (!loading && user) {
      router.replace('/(tabs)');
    }
  }, [user, loading, router]);

  // Don't render anything while checking auth or if already authenticated
  if (loading || user) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="sign-in" 
        options={{ 
          headerShown: false,
          title: 'Sign In'
        }} 
      />
      <Stack.Screen 
        name="sign-up" 
        options={{ 
          headerShown: false,
          title: 'Sign Up'
        }} 
      />
    </Stack>
  );
} 