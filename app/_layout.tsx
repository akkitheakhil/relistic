import LottieSplash from "@/components/SplashScreen/SplashScreen";
import { AppTheme, darkTheme, lightTheme } from "@/theme/colors";
import {SplashScreen, Stack} from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const theme: AppTheme = useMemo(
        () => (colorScheme === "dark" ? darkTheme : lightTheme),
        [colorScheme]
    );

    const [lottieDone, setLottieDone] = useState(false);
    const resourcesLoaded = true;

    useEffect(() => {
        SplashScreen.hideAsync().catch(() => {});
    }, []);

    const appReady = lottieDone && resourcesLoaded;

    return (
        <ThemeProvider theme={theme}>
            <StatusBar hidden />
            {!appReady ? (
                <View style={{ flex: 1, backgroundColor: theme.background }}>
                    <LottieSplash onFinish={() => setLottieDone(true)} />
                </View>
            ) : (
                <View style={{ flex: 1, backgroundColor: theme.background }}>
                    <Stack screenOptions={{ headerShown: false,  }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </View>
            )}
        </ThemeProvider>
    );
}
