import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../src/Profile";
import PostEditor from "../src/PostEditor";
import PostViewer from "../src/PostViewer";
import Changeppics from "../src/Changeppics";
import PWChange from "../src/PWChange";
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="PostEditor" component={PostEditor}  />
      <Stack.Screen name="PostViewer" component={PostViewer} />
      <Stack.Screen name="Changeppics" component={Changeppics} />
      <Stack.Screen name="PWChange" component={PWChange} />
    </Stack.Navigator>
  );
}

export { ProfileStackNavigator };