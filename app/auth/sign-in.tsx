import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
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

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await signIn(email, password);
      await triggerHaptic(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)');
    } catch (err: any) {
      await triggerHaptic(Haptics.NotificationFeedbackType.Error);
      setError(err.message || 'Failed to sign in');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your fitness journey</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/sign-up" as any)}>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff5252',
    marginTop: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
  linkText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: '600',
  }
}); 