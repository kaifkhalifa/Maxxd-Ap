import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface WorkoutPlan {
  name: string;
  description: string;
  days: WorkoutDay[];
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
  focus: string;
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

// Sample workout plan data
const samplePlans: WorkoutPlan[] = [
  {
    name: "Beginner Strength Training",
    description: "A well-rounded strength training program for beginners focusing on the major muscle groups.",
    days: [
      {
        day: "Monday",
        focus: "Full Body",
        exercises: [
          { name: "Bodyweight Squats", sets: 3, reps: "12-15", rest: "60 sec" },
          { name: "Push-ups (or Modified Push-ups)", sets: 3, reps: "8-12", rest: "60 sec" },
          { name: "Dumbbell Rows", sets: 3, reps: "10-12", rest: "60 sec" },
          { name: "Glute Bridges", sets: 3, reps: "12-15", rest: "60 sec" },
          { name: "Plank", sets: 3, reps: "20-30 sec", rest: "45 sec" }
        ]
      },
      {
        day: "Wednesday",
        focus: "Full Body",
        exercises: [
          { name: "Lunges", sets: 3, reps: "10 each leg", rest: "60 sec" },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12", rest: "60 sec" },
          { name: "Deadlifts (light weight)", sets: 3, reps: "10-12", rest: "90 sec" },
          { name: "Bicep Curls", sets: 3, reps: "10-12", rest: "45 sec" },
          { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec" }
        ]
      },
      {
        day: "Friday",
        focus: "Full Body",
        exercises: [
          { name: "Goblet Squats", sets: 3, reps: "12", rest: "60 sec" },
          { name: "Incline Push-ups", sets: 3, reps: "10-12", rest: "60 sec" },
          { name: "Lat Pulldowns", sets: 3, reps: "10-12", rest: "60 sec" },
          { name: "Tricep Dips", sets: 3, reps: "8-12", rest: "60 sec" },
          { name: "Russian Twists", sets: 3, reps: "12 each side", rest: "45 sec" }
        ]
      }
    ]
  },
  {
    name: "Bodyweight HIIT",
    description: "High-intensity interval training using just your bodyweight for maximum calorie burn.",
    days: [
      {
        day: "Monday",
        focus: "Full Body HIIT",
        exercises: [
          { name: "Jumping Jacks", sets: 4, reps: "45 sec", rest: "15 sec" },
          { name: "Mountain Climbers", sets: 4, reps: "45 sec", rest: "15 sec" },
          { name: "Burpees", sets: 4, reps: "45 sec", rest: "15 sec" },
          { name: "High Knees", sets: 4, reps: "45 sec", rest: "15 sec" },
          { name: "Plank Jacks", sets: 4, reps: "45 sec", rest: "15 sec" }
        ]
      },
      {
        day: "Wednesday",
        focus: "Cardio HIIT",
        exercises: [
          { name: "Jump Squats", sets: 4, reps: "40 sec", rest: "20 sec" },
          { name: "Push-up to Side Plank", sets: 4, reps: "40 sec", rest: "20 sec" },
          { name: "Skater Jumps", sets: 4, reps: "40 sec", rest: "20 sec" },
          { name: "Plank to Push-up", sets: 4, reps: "40 sec", rest: "20 sec" },
          { name: "Bicycle Crunches", sets: 4, reps: "40 sec", rest: "20 sec" }
        ]
      },
      {
        day: "Friday",
        focus: "Tabata",
        exercises: [
          { name: "Squat Jumps", sets: 8, reps: "20 sec", rest: "10 sec" },
          { name: "Push-ups", sets: 8, reps: "20 sec", rest: "10 sec" },
          { name: "Jumping Lunges", sets: 8, reps: "20 sec", rest: "10 sec" },
          { name: "Mountain Climbers", sets: 8, reps: "20 sec", rest: "10 sec" },
          { name: "Burpees", sets: 8, reps: "20 sec", rest: "10 sec" }
        ]
      }
    ]
  }
];

export default function WorkoutPlanGenerator() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [equipmentAvailable, setEquipmentAvailable] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const handleGenerateCustomPlan = () => {
    // In a real app, this would call an API with the user inputs
    // For now, we'll just show a sample plan
    setSelectedPlan(samplePlans[0]);
    setShowForm(false);
  };
  
  const renderPlanCard = (plan: WorkoutPlan, index: number) => {
    return (
      <TouchableOpacity 
        key={index}
        style={[styles.planCard, { backgroundColor: colors.cardBackground }]}
        onPress={() => setSelectedPlan(plan)}
      >
        <View style={styles.planHeader}>
          <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
          <View style={[styles.planBadge, { backgroundColor: colors.tint + '30' }]}>
            <Text style={[styles.planBadgeText, { color: colors.tint }]}>
              {plan.days.length} days
            </Text>
          </View>
        </View>
        <Text style={[styles.planDescription, { color: colors.tabIconDefault }]}>
          {plan.description}
        </Text>
        <View style={styles.planFooter}>
          <View style={styles.planFocus}>
            <Ionicons name="fitness" size={18} color={colors.tint} style={styles.planIcon} />
            <Text style={[styles.planFocusText, { color: colors.text }]}>
              {plan.days.map(day => day.focus).filter((value, index, self) => self.indexOf(value) === index).join(', ')}
            </Text>
          </View>
          <Text style={[styles.viewDetails, { color: colors.tint }]}>View Details</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderWorkoutDetails = () => {
    if (!selectedPlan) return null;
    
    return (
      <View style={styles.workoutDetailsContainer}>
        <View style={styles.workoutHeaderRow}>
          <View>
            <Text style={[styles.workoutTitle, { color: colors.text }]}>{selectedPlan.name}</Text>
            <Text style={[styles.workoutDescription, { color: colors.tabIconDefault }]}>
              {selectedPlan.description}
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: colors.cardBackground }]}
            onPress={() => setSelectedPlan(null)}
          >
            <Ionicons name="close" size={22} color={colors.tabIconDefault} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.daysContainer} horizontal showsHorizontalScrollIndicator={false}>
          {selectedPlan.days.map((day, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.dayTab, { backgroundColor: colors.tint + '20' }]}
            >
              <Text style={[styles.dayText, { color: colors.tint }]}>{day.day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <ScrollView style={styles.exercisesContainer}>
          {selectedPlan.days.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayPlan}>
              <View style={styles.dayHeader}>
                <Text style={[styles.dayName, { color: colors.text }]}>{day.day}</Text>
                <View style={[styles.focusBadge, { backgroundColor: colors.tint + '30' }]}>
                  <Text style={[styles.focusText, { color: colors.tint }]}>{day.focus}</Text>
                </View>
              </View>
              
              {day.exercises.map((exercise, exerciseIndex) => (
                <View 
                  key={exerciseIndex} 
                  style={[styles.exerciseItem, { backgroundColor: colors.cardBackground }]}
                >
                  <View style={styles.exerciseHeader}>
                    <Text style={[styles.exerciseName, { color: colors.text }]}>
                      {exercise.name}
                    </Text>
                    <View style={styles.exerciseDetails}>
                      <View style={styles.exerciseDetail}>
                        <Text style={[styles.exerciseDetailLabel, { color: colors.tabIconDefault }]}>
                          Sets
                        </Text>
                        <Text style={[styles.exerciseDetailValue, { color: colors.text }]}>
                          {exercise.sets}
                        </Text>
                      </View>
                      <View style={styles.exerciseDetail}>
                        <Text style={[styles.exerciseDetailLabel, { color: colors.tabIconDefault }]}>
                          Reps
                        </Text>
                        <Text style={[styles.exerciseDetailValue, { color: colors.text }]}>
                          {exercise.reps}
                        </Text>
                      </View>
                      <View style={styles.exerciseDetail}>
                        <Text style={[styles.exerciseDetailLabel, { color: colors.tabIconDefault }]}>
                          Rest
                        </Text>
                        <Text style={[styles.exerciseDetailValue, { color: colors.text }]}>
                          {exercise.rest}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.tint }]}
          >
            <Ionicons name="save-outline" size={20} color="#FFF" />
            <Text style={styles.saveButtonText}>Save This Workout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  
  const renderForm = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={[styles.formTitle, { color: colors.text }]}>Create Custom Workout</Text>
          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: colors.cardBackground }]}
            onPress={() => setShowForm(false)}
          >
            <Ionicons name="close" size={22} color={colors.tabIconDefault} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>What's your fitness goal?</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.cardBackground, color: colors.text }]}
            placeholderTextColor={colors.tabIconDefault}
            placeholder="e.g. Lose weight, build muscle, improve endurance"
            value={fitnessGoal}
            onChangeText={setFitnessGoal}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Your fitness level</Text>
          <View style={styles.pillsContainer}>
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.pill,
                  { 
                    backgroundColor: fitnessLevel === level ? colors.tint : colors.cardBackground 
                  }
                ]}
                onPress={() => setFitnessLevel(level)}
              >
                <Text 
                  style={[
                    styles.pillText, 
                    { color: fitnessLevel === level ? '#FFF' : colors.tabIconDefault }
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Equipment available</Text>
          <View style={styles.pillsContainer}>
            {["None", "Dumbbells", "Full Gym"].map((equipment) => (
              <TouchableOpacity
                key={equipment}
                style={[
                  styles.pill,
                  { 
                    backgroundColor: equipmentAvailable === equipment ? colors.tint : colors.cardBackground 
                  }
                ]}
                onPress={() => setEquipmentAvailable(equipment)}
              >
                <Text 
                  style={[
                    styles.pillText, 
                    { color: equipmentAvailable === equipment ? '#FFF' : colors.tabIconDefault }
                  ]}
                >
                  {equipment}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.generateButton, { backgroundColor: colors.tint }]}
          onPress={handleGenerateCustomPlan}
        >
          <Ionicons name="flash" size={20} color="#FFF" />
          <Text style={styles.generateButtonText}>Generate My Workout Plan</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  if (selectedPlan) {
    return renderWorkoutDetails();
  }
  
  if (showForm) {
    return renderForm();
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Workout Plans</Text>
        <TouchableOpacity 
          style={[styles.customButton, { backgroundColor: colors.tint }]}
          onPress={() => setShowForm(true)}
        >
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.customButtonText}>Custom</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
        AI-powered workout plans tailored to your goals
      </Text>
      
      <ScrollView style={styles.plansContainer}>
        {samplePlans.map((plan, index) => renderPlanCard(plan, index))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  customButtonText: {
    color: '#FFF',
    marginLeft: 4,
    fontWeight: '600',
  },
  plansContainer: {
    flex: 1,
  },
  planCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  planBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  planDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planFocus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planIcon: {
    marginRight: 6,
  },
  planFocusText: {
    fontSize: 14,
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '600',
  },
  workoutDetailsContainer: {
    flex: 1,
    padding: 20,
  },
  workoutHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  workoutDescription: {
    fontSize: 14,
    lineHeight: 20,
    maxWidth: '90%',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dayTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  dayText: {
    fontWeight: '600',
  },
  exercisesContainer: {
    flex: 1,
  },
  dayPlan: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  focusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  focusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  exerciseHeader: {
    flexDirection: 'column',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseDetail: {
    alignItems: 'center',
  },
  exerciseDetailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  exerciseDetailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  pillText: {
    fontWeight: '500',
  },
  generateButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  generateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 