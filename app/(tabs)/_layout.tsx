import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
            <Tabs.Screen name="list" options={{ title: "List" }} />
            <Tabs.Screen name="reminders" options={{ title: "Reminders" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
    );
}
