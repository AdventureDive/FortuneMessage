import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Login', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'log-in-outline' : 'log-in'} color={color} size={24} />
        )
      }} />
      <Tabs.Screen name="explore" options={{
        title: 'Explore', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'list-circle-outline' : 'list-circle'} color={color} size={24} />
        ),
      }} />
    </Tabs>
  );

}
