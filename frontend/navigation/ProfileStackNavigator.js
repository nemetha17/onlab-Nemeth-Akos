import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../src/Profile";
import PostEditor from "../src/PostEditor";
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="PostEditor" component={PostEditor}  />
    </Stack.Navigator>
  );
}

export { ProfileStackNavigator };