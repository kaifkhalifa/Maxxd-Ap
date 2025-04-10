import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock user type
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

// Mock auth service
class AuthService {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Try to load user from storage on init
    this.loadUserFromStorage();
  }

  private async loadUserFromStorage() {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        this.currentUser = JSON.parse(userJson);
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
  }

  private async saveUserToStorage(user: User | null) {
    try {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    // Immediately call with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    // Mock login - in a real app this would validate against a server
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Create a mock user
    const user: User = {
      uid: `user_${Date.now()}`,
      email: email,
      displayName: email.split('@')[0]
    };
    
    this.currentUser = user;
    await this.saveUserToStorage(user);
    this.notifyListeners();
    return user;
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    // Mock registration - in a real app this would register with a server
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Create a mock user
    const user: User = {
      uid: `user_${Date.now()}`,
      email: email,
      displayName: email.split('@')[0]
    };
    
    this.currentUser = user;
    await this.saveUserToStorage(user);
    this.notifyListeners();
    return user;
  }

  async signOut() {
    this.currentUser = null;
    await this.saveUserToStorage(null);
    this.notifyListeners();
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

export const auth = new AuthService(); 