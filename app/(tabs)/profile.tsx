import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  
  // State for settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [hapticFeedback, setHapticFeedback] = useState(true);
  
  // Mock user data
  const userData = {
    name: "Alex Johnson",
    username: "@alex_maxxd",
    joinDate: "Member since March 2023",
    bio: "On a journey to become the best version of myself. Focusing on fitness, mindfulness, and creative skills.",
    stats: {
      streakDays: 28,
      tasksCompleted: 152,
      skillsMastered: 3,
    },
    achievements: [
      { id: 1, name: "Early Riser", icon: "sunny", description: "Wake up before 6am for 7 consecutive days" },
      { id: 2, name: "Fitness Fanatic", icon: "fitness", description: "Complete 50 workout sessions" },
      { id: 3, name: "Mindfulness Master", icon: "leaf", description: "Meditate for 10 minutes daily for 14 days" },
    ],
    goals: [
      { id: 1, name: "Run 5K", progress: 70, category: "health" },
      { id: 2, name: "Read 12 Books", progress: 25, category: "mind" },
      { id: 3, name: "Save $5,000", progress: 45, category: "wealth" },
    ]
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'health': return colors.healthColor;
      case 'wealth': return colors.wealthColor;
      case 'mind': return colors.mindColor;
      case 'style': return colors.styleColor;
      case 'social': return colors.socialColor;
      case 'spiritual': return colors.spiritualColor;
      case 'productivity': return colors.productivityColor;
      default: return colors.tint;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.name, { color: colors.text }]}>{userData.name}</Text>
          <Text style={[styles.username, { color: colors.tabIconDefault }]}>{userData.username}</Text>
          <Text style={[styles.joinDate, { color: colors.tabIconDefault }]}>{userData.joinDate}</Text>
          
          <Text style={[styles.bio, { color: colors.text }]}>{userData.bio}</Text>
        </View>
        
        {/* Stats */}
        <View style={[styles.statsContainer, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{userData.stats.streakDays}</Text>
            <Text style={[styles.statLabel, { color: colors.tabIconDefault }]}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{userData.stats.tasksCompleted}</Text>
            <Text style={[styles.statLabel, { color: colors.tabIconDefault }]}>Tasks Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{userData.stats.skillsMastered}</Text>
            <Text style={[styles.statLabel, { color: colors.tabIconDefault }]}>Skills Mastered</Text>
          </View>
        </View>
        
        {/* Goals */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Current Goals</Text>
          {userData.goals.map(goal => (
            <View key={goal.id} style={[styles.goalItem, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.goalInfo}>
                <Text style={[styles.goalName, { color: colors.text }]}>{goal.name}</Text>
                <Text style={[styles.goalCategory, { color: getCategoryColor(goal.category) }]}>
                  {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBg, { backgroundColor: colors.tabIconDefault + '40' }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${goal.progress}%`,
                        backgroundColor: getCategoryColor(goal.category)
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.text }]}>{goal.progress}%</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            {userData.achievements.map(achievement => (
              <View key={achievement.id} style={[styles.achievementItem, { backgroundColor: colors.cardBackground }]}>
                <View style={[styles.achievementIcon, { backgroundColor: colors.tint + '20' }]}>
                  <Ionicons name={achievement.icon} size={24} color={colors.tint} />
                </View>
                <Text style={[styles.achievementName, { color: colors.text }]}>{achievement.name}</Text>
                <Text style={[styles.achievementDesc, { color: colors.tabIconDefault }]} numberOfLines={2}>
                  {achievement.description}
                </Text>
              </View>
            ))}
            <TouchableOpacity 
              style={[styles.achievementItem, styles.moreAchievements, { backgroundColor: colors.cardBackground }]}
            >
              <Ionicons name="trophy" size={24} color={colors.tabIconDefault} />
              <Text style={[styles.moreAchievementsText, { color: colors.tabIconDefault }]}>View All</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          <View style={[styles.settingsContainer, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="notifications" size={22} color={colors.tabIconDefault} style={styles.settingIcon} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#3e3e3e', true: colors.tint + '80' }}
                thumbColor={notifications ? colors.tint : '#f4f3f4'}
              />
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="moon" size={22} color={colors.tabIconDefault} style={styles.settingIcon} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#3e3e3e', true: colors.tint + '80' }}
                thumbColor={darkMode ? colors.tint : '#f4f3f4'}
              />
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="pulse" size={22} color={colors.tabIconDefault} style={styles.settingIcon} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Haptic Feedback</Text>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: '#3e3e3e', true: colors.tint + '80' }}
                thumbColor={hapticFeedback ? colors.tint : '#f4f3f4'}
              />
            </View>
          </View>
          
          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.error + '20' }]}>
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4285F4',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 14,
    marginBottom: 15,
  },
  bio: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 10,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  goalItem: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  goalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
  },
  goalCategory: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBg: {
    height: 8,
    borderRadius: 4,
    flex: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  achievementsScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  achievementItem: {
    width: 140,
    borderRadius: 12,
    padding: 15,
    marginRight: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementName: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementDesc: {
    fontSize: 12,
    textAlign: 'center',
  },
  moreAchievements: {
    justifyContent: 'center',
    width: 100,
  },
  moreAchievementsText: {
    marginTop: 10,
    fontSize: 14,
  },
  settingsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
}); 