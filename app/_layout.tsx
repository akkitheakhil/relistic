import { AppTheme, darkTheme, lightTheme } from "@/theme/colors";
import { SplashScreen, Stack } from "expo-router";
import React, { useMemo } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const theme: AppTheme = useMemo(
        () => (colorScheme === "dark" ? darkTheme : lightTheme),
        [colorScheme]
    );

    return (
        <ThemeProvider theme={theme}>
            <StatusBar hidden />
                <View style={{ flex: 1, backgroundColor: theme.background }}>
                </View>
        </ThemeProvider>
    );
}
