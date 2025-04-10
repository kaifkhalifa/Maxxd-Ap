import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type Quest = {
  id: string;
  title: string;
  category: 'Health' | 'Wealth' | 'Style' | 'Mind' | 'Social' | 'Spiritual' | 'Productivity';
  xp: number;
  completed: boolean;
};

export default function QuestsScreen() {
  const colorScheme = useColorScheme() || 'dark';
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Complete a 30-minute workout',
      category: 'Health',
      xp: 50,
      completed: false,
    },
    {
      id: '2',
      title: 'Track your expenses for the day',
      category: 'Wealth',
      xp: 30,
      completed: false,
    },
    {
      id: '3',
      title: 'Read for 20 minutes',
      category: 'Mind',
      xp: 40,
      completed: false,
    },
    {
      id: '4',
      title: 'Create a new outfit combination',
      category: 'Style',
      xp: 35,
      completed: false,
    },
    {
      id: '5',
      title: 'Message a friend you haven\'t spoken to in a while',
      category: 'Social',
      xp: 45,
      completed: false,
    },
    {
      id: '6',
      title: 'Meditate for 10 minutes',
      category: 'Spiritual',
      xp: 40,
      completed: false,
    },
    {
      id: '7',
      title: 'Create a to-do list for tomorrow',
      category: 'Productivity',
      xp: 25,
      completed: false,
    },
  ]);

  const toggleQuestCompletion = (id: string) => {
    setQuests(
      quests.map((quest) =>
        quest.id === id ? { ...quest, completed: !quest.completed } : quest
      )
    );
  };

  const getCategoryColor = (category: Quest['category']) => {
    const colors = Colors[colorScheme];
    switch (category) {
      case 'Health':
        return colors.healthColor;
      case 'Wealth':
        return colors.wealthColor;
      case 'Style':
        return colors.styleColor;
      case 'Mind':
        return colors.mindColor;
      case 'Social':
        return colors.socialColor;
      case 'Spiritual':
        return colors.spiritualColor;
      case 'Productivity':
        return colors.productivityColor;
      default:
        return colors.tint;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Daily Quests</ThemedText>
        <ThemedText>Complete these quests to earn XP</ThemedText>
      </ThemedView>

      <ScrollView style={styles.questsList}>
        {quests.map((quest) => (
          <ThemedView key={quest.id} style={styles.questCard}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => toggleQuestCompletion(quest.id)}>
              <View
                style={[
                  styles.checkbox,
                  quest.completed && { backgroundColor: getCategoryColor(quest.category) },
                ]}>
                {quest.completed && <Ionicons name="checkmark" size={16} color="#FFF" />}
              </View>
              <ThemedText
                style={[
                  styles.questTitle,
                  quest.completed && styles.completedQuestTitle,
                ]}>
                {quest.title}
              </ThemedText>
            </TouchableOpacity>
            <View style={styles.questMetaContainer}>
              <View
                style={[
                  styles.categoryTag,
                  { backgroundColor: getCategoryColor(quest.category) },
                ]}>
                <ThemedText style={styles.categoryText}>{quest.category}</ThemedText>
              </View>
              <ThemedText style={styles.xpText}>{quest.xp} XP</ThemedText>
            </View>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
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
  questsList: {
    paddingHorizontal: 20,
  },
  questCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  questTitle: {
    fontSize: 16,
    flex: 1,
  },
  completedQuestTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  questMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  xpText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 