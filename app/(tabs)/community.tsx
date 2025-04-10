import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  timestamp: string;
  content: string;
  category: 'Health' | 'Wealth' | 'Style' | 'Mind' | 'Social' | 'Spiritual' | 'Productivity';
  likes: number;
  comments: number;
  imageUrl?: string;
  achievement?: {
    title: string;
    xp: number;
  };
};

export default function CommunityScreen() {
  const colorScheme = useColorScheme() || 'dark';
  const colors = Colors[colorScheme];
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah K.',
        avatar: 'https://via.placeholder.com/40',
        level: 'Gold',
      },
      timestamp: '2h ago',
      content: 'Just hit a new personal record on my deadlift! Been working on this for months! 💪',
      category: 'Health',
      likes: 24,
      comments: 5,
      imageUrl: 'https://via.placeholder.com/400x300',
      achievement: {
        title: 'New PR Achieved',
        xp: 100,
      },
    },
    {
      id: '2',
      author: {
        name: 'Mark T.',
        avatar: 'https://via.placeholder.com/40',
        level: 'Silver',
      },
      timestamp: '5h ago',
      content: 'Finally organized my finances and set up automatic investments. Small steps, but it feels great to be on track!',
      category: 'Wealth',
      likes: 18,
      comments: 3,
    },
    {
      id: '3',
      author: {
        name: 'Alex J.',
        avatar: 'https://via.placeholder.com/40',
        level: 'Bronze',
      },
      timestamp: '1d ago',
      content: 'Tried meditation for the first time today. 10 minutes felt like forever but I\'m proud I stuck with it. Any tips from the meditation pros?',
      category: 'Mind',
      likes: 32,
      comments: 12,
    },
  ]);

  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId ? {...post, likes: post.likes - 1} : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? {...post, likes: post.likes + 1} : post
      ));
    }
  };

  const getCategoryColor = (category: Post['category']) => {
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
        <ThemedText type="title">Community</ThemedText>
        <ThemedText>Share your progress and inspire others</ThemedText>
      </ThemedView>

      <TouchableOpacity style={styles.createPostButton}>
        <Ionicons name="add-circle" size={22} color={colors.tint} />
        <ThemedText style={styles.createPostText}>Share your achievements</ThemedText>
      </TouchableOpacity>
      
      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <Ionicons name="trophy" size={22} color="#FFD700" />
          <ThemedText style={styles.challengeTitle}>Weekly Challenge</ThemedText>
        </View>
        <ThemedText style={styles.challengeDescription}>
          Complete 3 morning workouts this week and earn the "Early Riser" badge!
        </ThemedText>
        <View style={styles.challengeMeta}>
          <ThemedText style={styles.challengeParticipants}>127 participants</ThemedText>
          <ThemedText style={styles.challengeReward}>+150 XP</ThemedText>
        </View>
      </View>

      <ScrollView 
        style={styles.feedContainer}
        showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <ThemedView key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAuthor}>
                <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
                <View>
                  <ThemedText style={styles.authorName}>{post.author.name}</ThemedText>
                  <View style={styles.postMeta}>
                    <ThemedText style={styles.postTimestamp}>{post.timestamp}</ThemedText>
                    <View 
                      style={[
                        styles.categoryBadge, 
                        { backgroundColor: getCategoryColor(post.category) }
                      ]}>
                      <ThemedText style={styles.categoryText}>{post.category}</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
              <View 
                style={[
                  styles.levelBadge, 
                  { 
                    backgroundColor: post.author.level === 'Gold' 
                      ? 'rgba(255, 215, 0, 0.2)' 
                      : post.author.level === 'Silver' 
                        ? 'rgba(192, 192, 192, 0.2)' 
                        : 'rgba(205, 127, 50, 0.2)'
                  }
                ]}>
                <ThemedText 
                  style={[
                    styles.levelText, 
                    { 
                      color: post.author.level === 'Gold' 
                        ? '#FFD700' 
                        : post.author.level === 'Silver' 
                          ? '#C0C0C0' 
                          : '#CD7F32'
                    }
                  ]}>
                  {post.author.level}
                </ThemedText>
              </View>
            </View>

            <ThemedText style={styles.postContent}>{post.content}</ThemedText>

            {post.imageUrl && (
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            )}

            {post.achievement && (
              <View style={styles.achievementContainer}>
                <Ionicons name="ribbon" size={20} color="#FFD700" />
                <ThemedText style={styles.achievementTitle}>{post.achievement.title}</ThemedText>
                <ThemedText style={styles.achievementXP}>+{post.achievement.xp} XP</ThemedText>
              </View>
            )}

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}>
                <Ionicons 
                  name={likedPosts.includes(post.id) ? "flame" : "flame-outline"} 
                  size={22} 
                  color={likedPosts.includes(post.id) ? colors.tint : colors.icon} 
                />
                <ThemedText 
                  style={[
                    styles.actionText, 
                    likedPosts.includes(post.id) && { color: colors.tint }
                  ]}>
                  Maxx'd · {post.likes}
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.icon} />
                <ThemedText style={styles.actionText}>Comment · {post.comments}</ThemedText>
              </TouchableOpacity>
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
    paddingBottom: 10,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  createPostText: {
    marginLeft: 10,
    color: '#4285F4',
    fontWeight: 'bold',
  },
  challengeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  challengeDescription: {
    marginBottom: 12,
    lineHeight: 20,
  },
  challengeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  challengeParticipants: {
    fontSize: 12,
    opacity: 0.7,
  },
  challengeReward: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  feedContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postCard: {
    width: cardWidth,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTimestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  achievementTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
    flex: 1,
  },
  achievementXP: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
  },
}); 