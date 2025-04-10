import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

// Define a type for icon names
type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function DashboardScreen() {
  const colorScheme = useColorScheme() || 'dark';
  const colors = Colors[colorScheme];

  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'wealth' | 'style'>('overview');

  // Mock data for the dashboard
  const dashboard = {
    totalXP: 2350,
    xpGained: 250,
    streak: 7,
    questsCompleted: 24,
    totalQuests: 30,
    scorecard: [
      { category: 'Health', level: 'Silver', progress: 60 },
      { category: 'Wealth', level: 'Bronze', progress: 40 },
      { category: 'Style', level: 'Gold', progress: 80 },
      { category: 'Mind', level: 'Bronze', progress: 30 },
      { category: 'Social', level: 'Bronze', progress: 45 },
    ],
    dailyQuests: [
      { id: '1', title: 'Complete a 30-minute workout', category: 'Health', xp: 50, completed: false },
      { id: '2', title: 'Track your expenses for the day', category: 'Wealth', xp: 30, completed: true },
      { id: '3', title: 'Read for 20 minutes', category: 'Mind', xp: 40, completed: false },
    ],
    recentActivity: [
      { 
        id: '1', 
        title: 'Completed a 30-minute workout', 
        category: 'Health', 
        xp: 50, 
        timestamp: '2h ago',
        icon: 'fitness-outline' as IconName
      },
      { 
        id: '2', 
        title: 'Reached Silver level in Style', 
        category: 'Style', 
        xp: 200, 
        timestamp: 'Yesterday',
        icon: 'shirt-outline' as IconName
      },
      { 
        id: '3', 
        title: 'Earned the \'Early Riser\' badge', 
        category: 'Productivity', 
        xp: 100, 
        timestamp: '2 days ago',
        icon: 'sunny-outline' as IconName
      },
      { 
        id: '4', 
        title: 'Read for 20 minutes', 
        category: 'Mind', 
        xp: 40, 
        timestamp: '2 days ago',
        icon: 'book-outline' as IconName
      },
      { 
        id: '5', 
        title: '5-day streak achieved', 
        category: 'General', 
        xp: 75, 
        timestamp: '3 days ago',
        icon: 'flame-outline' as IconName
      },
    ]
  };

  const getCategoryColor = (category: string) => {
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

  const handleQuestPress = (questId: string) => {
    // In a real app, this would navigate to the quest details or mark it as complete
    router.push('/quests');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <View>
          <ThemedText type="title">Dashboard</ThemedText>
          <ThemedText>Track your progress and complete daily quests to level up.</ThemedText>
        </View>
        <TouchableOpacity style={styles.glowUpButton} onPress={() => router.push('/glow-up')}>
          <ThemedText style={styles.glowUpButtonText}>View Glow-Up</ThemedText>
          <Ionicons name="arrow-forward" size={16} color={colors.text} />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.statsRow}>
          <ThemedView style={[styles.statsCard, styles.xpCard]}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="trophy" size={24} color={colors.tint} />
            </View>
            <ThemedText style={styles.statsValue}>{dashboard.totalXP.toLocaleString()}</ThemedText>
            <ThemedText style={styles.statsLabel}>Total XP</ThemedText>
            <ThemedText style={styles.statsIncrement}>+{dashboard.xpGained} from yesterday</ThemedText>
          </ThemedView>
          
          <ThemedView style={[styles.statsCard, styles.streakCard]}>
            <View style={[styles.statsIconContainer, { backgroundColor: 'rgba(0, 230, 118, 0.1)' }]}>
              <Ionicons name="flame" size={24} color={colors.success} />
            </View>
            <View style={styles.streakContent}>
              <ThemedText style={styles.statsValue}>{dashboard.streak} days</ThemedText>
              <ThemedText style={styles.statsLabel}>Streak</ThemedText>
              <ThemedText style={styles.statsIncrement}>Keep it going!</ThemedText>
            </View>
          </ThemedView>
        </View>

        <ThemedView style={styles.questsCompletedCard}>
          <View style={styles.questsCompletedHeader}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#FFD700" />
            </View>
            <ThemedText style={styles.questsCompletedTitle}>Quests Completed</ThemedText>
          </View>
          <View style={styles.questsCompletedContent}>
            <ThemedText style={styles.questsCompletedValue}>
              {dashboard.questsCompleted}/{dashboard.totalQuests}
            </ThemedText>
            <ThemedText style={styles.questsCompletedLabel}>This month</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.scorecardSection}>
          <ThemedText style={styles.sectionTitle}>Scorecard</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Your progress across all life domains</ThemedText>
          
          {dashboard.scorecard.map((item) => (
            <View key={item.category} style={styles.scorecardItem}>
              <View style={styles.scorecardItemHeader}>
                <ThemedText style={styles.scorecardCategory}>{item.category}</ThemedText>
                <ThemedText 
                  style={[
                    styles.scorecardLevel, 
                    { 
                      color: item.level === 'Gold' 
                        ? '#FFD700' 
                        : item.level === 'Silver' 
                          ? '#C0C0C0' 
                          : '#CD7F32'
                    }
                  ]}>
                  {item.level}
                </ThemedText>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${item.progress}%`,
                      backgroundColor: getCategoryColor(item.category)
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ThemedView>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}>
            <ThemedText style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Overview
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'health' && styles.activeTab]}
            onPress={() => setActiveTab('health')}>
            <ThemedText style={[styles.tabText, activeTab === 'health' && styles.activeTabText]}>
              Health
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'wealth' && styles.activeTab]}
            onPress={() => setActiveTab('wealth')}>
            <ThemedText style={[styles.tabText, activeTab === 'wealth' && styles.activeTabText]}>
              Wealth
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'style' && styles.activeTab]}
            onPress={() => setActiveTab('style')}>
            <ThemedText style={[styles.tabText, activeTab === 'style' && styles.activeTabText]}>
              Style
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionsContainer}>
          <ThemedView style={styles.sectionCard}>
            <ThemedText style={styles.sectionTitle}>Daily Quests</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>Complete these quests to earn XP</ThemedText>
            
            {dashboard.dailyQuests.map((quest) => (
              <TouchableOpacity 
                key={quest.id} 
                style={styles.questItem} 
                onPress={() => handleQuestPress(quest.id)}>
                <View 
                  style={[
                    styles.checkbox, 
                    quest.completed && { backgroundColor: getCategoryColor(quest.category) }
                  ]}>
                  {quest.completed && <Ionicons name="checkmark" size={16} color="#FFF" />}
                </View>
                <View style={styles.questInfo}>
                  <ThemedText 
                    style={[
                      styles.questTitle, 
                      quest.completed && styles.completedQuestTitle
                    ]}>
                    {quest.title}
                  </ThemedText>
                  <View style={styles.questMeta}>
                    <View 
                      style={[
                        styles.categoryTag, 
                        { backgroundColor: getCategoryColor(quest.category) }
                      ]}>
                      <ThemedText style={styles.categoryTagText}>{quest.category}</ThemedText>
                    </View>
                    <ThemedText style={styles.questXP}>{quest.xp} XP</ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => router.push('/quests')}>
              <ThemedText style={styles.viewAllText}>View All Quests</ThemedText>
              <Ionicons name="arrow-forward" size={16} color={colors.tint} />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.sectionCard}>
            <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>Your latest achievements and milestones</ThemedText>
            
            {dashboard.recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View 
                  style={[
                    styles.activityIconContainer, 
                    { backgroundColor: getCategoryColor(activity.category) }
                  ]}>
                  <Ionicons name={activity.icon} size={20} color="#FFF" />
                </View>
                <View style={styles.activityInfo}>
                  <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                  <View style={styles.activityMeta}>
                    <View 
                      style={[
                        styles.categoryTag, 
                        { backgroundColor: getCategoryColor(activity.category) }
                      ]}>
                      <ThemedText style={styles.categoryTagText}>{activity.category}</ThemedText>
                    </View>
                    <ThemedText style={styles.activityTimestamp}>
                      +{activity.xp} XP  {activity.timestamp}
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </ThemedView>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  glowUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  glowUpButtonText: {
    marginRight: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  xpCard: {
    marginRight: 10,
  },
  streakCard: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  streakContent: {
    marginLeft: 12,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  statsIncrement: {
    fontSize: 12,
    color: '#00E676',
    marginTop: 4,
  },
  questsCompletedCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  questsCompletedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  questsCompletedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  questsCompletedContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  questsCompletedValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  questsCompletedLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  scorecardSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  scorecardItem: {
    marginBottom: 12,
  },
  scorecardItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scorecardCategory: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scorecardLevel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#1E1E1E',
    marginBottom: 16,
  },
  questItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
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
  questInfo: {
    flex: 1,
  },
  questTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  completedQuestTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  questMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  questXP: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    marginTop: 8,
  },
  viewAllText: {
    color: '#4285F4',
    fontWeight: 'bold',
    marginRight: 8,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTimestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginLeft: 8,
  },
});
