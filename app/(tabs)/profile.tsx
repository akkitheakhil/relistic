import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

const Profile = () => {
    const theme = useTheme();
    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
            <View>
                <Text style={{ color: theme.textPrimary }}>Profile Screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
