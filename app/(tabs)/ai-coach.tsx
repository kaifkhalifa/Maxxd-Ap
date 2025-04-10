import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function AICoachScreen() {
  const colorScheme = useColorScheme() || 'dark';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Maxx\'d AI Coach. How can I help you level up today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const colors = Colors[colorScheme];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputText('');

    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((currentMessages) => [...currentMessages, aiResponse]);
    }, 1000);
  };

  // Simple mock AI responses
  const getAIResponse = (userMessage: string): string => {
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes('workout') || userMessageLower.includes('exercise')) {
      return 'For better workout results, try incorporating high-intensity interval training. Start with 30 seconds of maximum effort followed by 1 minute of rest, and repeat for 15-20 minutes. This can boost your metabolism for hours after!';
    } else if (userMessageLower.includes('money') || userMessageLower.includes('saving')) {
      return 'A great way to save money is using the 50/30/20 rule: 50% of income for needs, 30% for wants, and 20% for savings. Try tracking your expenses for a week to see where you can cut back.';
    } else if (userMessageLower.includes('style') || userMessageLower.includes('clothes')) {
      return 'To upgrade your style, focus on fit first - well-fitting clothes instantly look more expensive. Try creating a capsule wardrobe with versatile pieces that mix and match easily.';
    } else if (userMessageLower.includes('meditation') || userMessageLower.includes('stress')) {
      return 'Try this quick stress-relief technique: breathe in for 4 counts, hold for 7, exhale for 8. Repeat 4 times. This activates your parasympathetic nervous system and helps calm anxiety.';
    } else if (userMessageLower.includes('goal') || userMessageLower.includes('plan')) {
      return 'To achieve your goals, make them SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of "get fit", try "do 30-minute workouts 3x weekly for the next month."';
    } else {
      return 'That\'s a great question! To maximize your potential, focus on creating consistent habits rather than waiting for motivation. Even small daily actions compound tremendously over time. What specific area would you like advice on?';
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">AI Maxx Coach</ThemedText>
        <ThemedText>Get personalized advice to level up your life</ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user'
                ? styles.userMessage
                : styles.aiMessage,
            ]}>
            {message.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Ionicons name="fitness" size={20} color="#FFFFFF" />
              </View>
            )}
            <View
              style={[
                styles.messageContent,
                message.sender === 'user'
                  ? styles.userMessageContent
                  : styles.aiMessageContent,
              ]}>
              <ThemedText style={styles.messageText}>{message.text}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.premiumBanner}>
        <Ionicons name="diamond" size={20} color={colors.accent} />
        <ThemedText style={styles.premiumText}>
          Upgrade to Maxx Mode for unlimited AI coaching
        </ThemedText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask your AI Coach..."
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}>
          <Ionicons
            name="send"
            size={24}
            color={inputText.trim() ? colors.tint : 'rgba(255, 255, 255, 0.3)'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageContent: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userMessageContent: {
    backgroundColor: '#4285F4',
  },
  aiMessageContent: {
    backgroundColor: '#1E1E1E',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 255, 204, 0.1)',
    margin: 16,
    borderRadius: 12,
  },
  premiumText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#00FFCC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 120,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
}); 