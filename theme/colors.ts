export const lightTheme = {
  mode: 'light',
  background: '#F8F9FA',
  backgroundInverted: '#1C1C1E',
  card: '#FFFFFF',
  primary: '#38F9D7',
  primaryGradient: ['#B2EBF2', '#80DEEA', '#4DD0E1'],
  accentBlue: ['#7EE8FA', '#EEC0C6'],
  accentPink: '#FDD7F3',
  accentOrange: '#FFD3B6',
  textPrimary: '#212121',
  textSecondary: '#666666',
  divider: '#E0E0E0',
  white: '#FFFFFF',
  grey_100: '#E9FBFB',
};

export const darkTheme = {
  mode: 'dark',
  background: '#1C1C1E',
  backgroundInverted: '#F8F9FA',
  card: '#2C2C2E',
  primary: '#38F9D7',
  primaryGradient: ['#B2EBF2', '#80DEEA', '#4DD0E1'],
  accentBlue: ['#7EE8FA', '#EEC0C6'],
  accentPink: '#FF8ED8',
  accentOrange: '#FFA46B',
  textPrimary: '#fdfbfbff',
  textSecondary: '#B0B0B0',
  divider: '#444444',
  white: '#FFFFFF',
  grey_100: '#E9FBFB',
};

export type AppTheme = typeof lightTheme;
