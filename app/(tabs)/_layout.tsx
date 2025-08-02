import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home", 
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: "History", 
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="trends" 
        options={{ 
          title: "Trends", 
          tabBarIcon: ({ color, size }) => <Ionicons name="trending-up" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="vapps" 
        options={{ 
          title: "vApps", 
          tabBarIcon: ({ color, size }) => <Ionicons name="apps" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profile", 
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> 
        }} 
      />
    </Tabs>
  );
}
