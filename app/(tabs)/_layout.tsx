import { Dimensions, View } from "react-native";
import Index from ".";

export default function TabLayout() {
  return (
    // <Tabs>
    //   <Tabs.Screen name="index" options={{
    //     title: 'Manage Task',
    //     headerShown:false,
    //     tabBarIcon: ({ color, focused }) => (
    //       <Ionicons name={focused ? 'log-in-outline' : 'log-in'} color={color} size={24} />
    //     )
    //   }} />
    //   {/* <Tabs.Screen name="explore" options={{
    //     title: 'Explore', tabBarIcon: ({ color, focused }) => (
    //       <Ionicons name={focused ? 'list-circle-outline' : 'list-circle'} color={color} size={24} />
    //     ),
    //   }} /> */}
    // </Tabs>
    <View style={{ minHeight:Dimensions.get("screen").height}}>
    <Index/>
    </View>
  );

}
