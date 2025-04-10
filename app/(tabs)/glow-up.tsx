import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

type GlowUpEntry = {
  id: string;
  date: string;
  category: 'Health' | 'Wealth' | 'Style' | 'Mind' | 'Social' | 'Spiritual' | 'Productivity';
  title: string;
  description: string;
  imageUrl?: string;
  metric?: {
    name: string;
    value: string;
    previousValue: string;
  };
};

export default function GlowUpScreen() {
  const colorScheme = useColorScheme() || 'dark';
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats'>('timeline');
  
  const [glowUpEntries] = useState<GlowUpEntry[]>([
    {
      id: '1',
      date: '2023-04-02',
      category: 'Health',
      title: 'First 5k Run',
      description: 'Completed my first 5k run without stopping!',
      imageUrl: 'https://via.placeholder.com/300x200',
      metric: {
        name: 'Running Time',
        value: '32:45',
        previousValue: '35:12',
      },
    },
    {
      id: '2',
      date: '2023-03-25',
      category: 'Style',
      title: 'New Wardrobe',
      description: 'Updated my wardrobe with some great new pieces.',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: '3',
      date: '2023-03-18',
      category: 'Wealth',
      title: 'Investment Milestone',
      description: 'Reached my savings goal for the quarter!',
      metric: {
        name: 'Savings',
        value: '$5,000',
        previousValue: '$3,200',
      },
    },
  ]);

  const [stats] = useState([
    { category: 'Health', level: 'Silver', xp: 1250, nextLevel: 2000 },
    { category: 'Wealth', level: 'Bronze', xp: 850, nextLevel: 1500 },
    { category: 'Style', level: 'Gold', xp: 3200, nextLevel: 4000 },
    { category: 'Mind', level: 'Bronze', xp: 650, nextLevel: 1500 },
    { category: 'Social', level: 'Silver', xp: 1600, nextLevel: 2000 },
    { category: 'Spiritual', level: 'Bronze', xp: 350, nextLevel: 1500 },
    { category: 'Productivity', level: 'Silver', xp: 1950, nextLevel: 2000 },
  ]);
  
  const getCategoryColor = (category: GlowUpEntry['category']) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze':
        return '#CD7F32';
      case 'Silver':
        return '#C0C0C0';
      case 'Gold':
        return '#FFD700';
      case 'Maxx\'d':
        return '#00FFCC';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Glow-Up Tracker</ThemedText>
        <ThemedText>Track your progress and transformations</ThemedText>
      </ThemedView>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'timeline' && styles.activeTab]}
          onPress={() => setActiveTab('timeline')}>
          <ThemedText style={[styles.tabText, activeTab === 'timeline' && styles.activeTabText]}>
            Timeline
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'stats' && styles.activeTab]}
          onPress={() => setActiveTab('stats')}>
          <ThemedText style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
            Stats
          </ThemedText>
        </TouchableOpacity>
      </View>

      {activeTab === 'timeline' ? (
        <ScrollView style={styles.contentContainer}>
          <TouchableOpacity style={styles.addEntryButton}>
            <Ionicons name="add-circle" size={24} color={Colors[colorScheme].tint} />
            <ThemedText style={styles.addEntryText}>Add New Glow-Up Entry</ThemedText>
          </TouchableOpacity>

          {glowUpEntries.map((entry) => (
            <ThemedView key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <View
                  style={[
                    styles.categoryIndicator,
                    { backgroundColor: getCategoryColor(entry.category) },
                  ]}
                />
                <ThemedText style={styles.entryDate}>{formatDate(entry.date)}</ThemedText>
                <ThemedText style={styles.entryCategory}>{entry.category}</ThemedText>
              </View>
              <ThemedText style={styles.entryTitle}>{entry.title}</ThemedText>
              <ThemedText style={styles.entryDescription}>{entry.description}</ThemedText>
              
              {entry.imageUrl && (
                <Image source={{ uri: entry.imageUrl }} style={styles.entryImage} />
              )}
              
              {entry.metric && (
                <View style={styles.metricContainer}>
                  <ThemedText style={styles.metricName}>{entry.metric.name}</ThemedText>
                  <View style={styles.metricValueContainer}>
                    <ThemedText style={styles.metricPreviousValue}>
                      {entry.metric.previousValue}
                    </ThemedText>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.metricValue}>{entry.metric.value}</ThemedText>
                  </View>
                </View>
              )}
            </ThemedView>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.contentContainer}>
          <ThemedText style={styles.sectionTitle}>Your Life Domain Levels</ThemedText>
          
          {stats.map((stat) => (
            <ThemedView key={stat.category} style={styles.statCard}>
              <View style={styles.statHeader}>
                <ThemedText style={styles.statCategory}>{stat.category}</ThemedText>
                <View style={styles.levelBadge}>
                  <ThemedText style={[styles.levelText, { color: getLevelColor(stat.level) }]}>
                    {stat.level}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${(stat.xp / stat.nextLevel) * 100}%`,
                      backgroundColor: getCategoryColor(stat.category as any)
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.xpContainer}>
                <ThemedText style={styles.xpText}>
                  {stat.xp} / {stat.nextLevel} XP
                </ThemedText>
                <ThemedText style={styles.xpToGo}>
                  {stat.nextLevel - stat.xp} XP to next level
                </ThemedText>
              </View>
            </ThemedView>
          ))}
        </ScrollView>
      )}
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4285F4',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#4285F4',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  addEntryText: {
    marginLeft: 10,
    color: '#4285F4',
    fontWeight: 'bold',
  },
  entryCard: {
    width: cardWidth,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    marginBottom: 20,
    padding: 15,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  entryDate: {
    fontSize: 12,
    opacity: 0.8,
    marginRight: 8,
  },
  entryCategory: {
    fontSize: 12,
    opacity: 0.8,
    fontWeight: 'bold',
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  entryDescription: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  entryImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
  },
  metricContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  metricName: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricPreviousValue: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    opacity: 0.6,
    marginRight: 8,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  xpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 14,
  },
  xpToGo: {
    fontSize: 12,
    opacity: 0.7,
  },
}); 