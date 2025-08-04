import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Home', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        )
      }} />
      <Tabs.Screen name="favourite" options={{
        title: 'Favourite', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'star-sharp' : 'star-outline'} color={color} size={24} />
        ),
      }} />
      <Tabs.Screen name="explore" options={{
        title: 'Explore', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'list-circle-outline' : 'list-circle'} color={color} size={24} />
        ),
      }} />
    </Tabs>
  );

}
