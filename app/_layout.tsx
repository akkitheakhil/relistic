import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, View, useColorScheme } from 'react-native';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';

import LottieSplash from '@/components/SplashScreen/SplashScreen';
import { useAppStore } from '@/store/app-store';
import { AppTheme, darkTheme, lightTheme } from '@/theme/colors';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { hasSeenOnboarding } = useAppStore();
  const colorScheme = useColorScheme();
  const theme: AppTheme = useMemo(
    () => (colorScheme === 'dark' ? darkTheme : lightTheme),
    [colorScheme],
  );

  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [lottieDone, setLottieDone] = useState(false);
  const appReady = (fontsLoaded || !!fontError) && lottieDone;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [appReady]);

  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <StatusBar hidden />
        {!appReady ? (
          <View style={{ flex: 1, backgroundColor: theme.background }}>
            <LottieSplash onFinish={() => setLottieDone(true)} />
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Protected guard={hasSeenOnboarding}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack.Protected>
              <Stack.Protected guard={!hasSeenOnboarding}>
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              </Stack.Protected>
            </Stack>
          </View>
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
