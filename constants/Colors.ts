/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Maxx'd app color scheme - Sleek, motivational, futuristic
 * UI Theme: Midnight black + neon gradients
 */

const primaryColor = '#4285F4'; // Bright blue for primary elements
const secondaryColor = '#00FFCC'; // Neon teal for accents

export const Colors = {
  light: {
    text: '#FFFFFF', // White text on dark background
    background: '#121212', // Dark background
    tint: primaryColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryColor,
    cardBackground: '#1E1E1E',
    success: '#00E676', // Green for completed tasks
    warning: '#FFAB00', // Orange for alerts
    error: '#FF5252', // Red for errors
    info: '#2196F3', // Blue for information
    accent: secondaryColor,
    healthColor: '#FF5252', // Red for health category
    wealthColor: '#00E676', // Green for wealth category
    styleColor: '#BA68C8', // Purple for style category  
    mindColor: '#4FC3F7', // Blue for mind category
    socialColor: '#FFAB00', // Yellow for social category
    spiritualColor: '#9575CD', // Indigo for spiritual category
    productivityColor: '#4DD0E1', // Cyan for productivity category
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: primaryColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryColor,
    cardBackground: '#1E1E1E',
    success: '#00E676',
    warning: '#FFAB00',
    error: '#FF5252',
    info: '#2196F3',
    accent: secondaryColor,
    healthColor: '#FF5252',
    wealthColor: '#00E676',
    styleColor: '#BA68C8',
    mindColor: '#4FC3F7',
    socialColor: '#FFAB00',
    spiritualColor: '#9575CD',
    productivityColor: '#4DD0E1',
  },
};
