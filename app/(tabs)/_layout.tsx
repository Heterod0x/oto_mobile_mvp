import { Ionicons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarButton: (props) => (
      <PlatformPressable
        {...props}
        pressColor="#4f46e533" //For android
        pressOpacity={0.3} //For ios
      />),
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 40,
          right: 40,
          backgroundColor: "#ffffff",
          borderRadius: 25,
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          paddingHorizontal: 8,
          marginHorizontal: 24,
          marginBottom: 8,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#666",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          ...Platform.select({
            ios: {
              shadowColor: "#666",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
            },
            android: {
              elevation: 10,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
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
