import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "../src/Search";
import PostViewer from "../src/PostViewer";
import UserProfile from "../src/Userprofile.js"
const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
      <Stack.Screen name="PostViewer" component={PostViewer} options={{headerShown: false}}   />
      <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}}  />
    </Stack.Navigator>
  );
}

export { SearchStackNavigator };