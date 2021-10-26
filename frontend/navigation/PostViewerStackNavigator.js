import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../src/Home";
import PostViewer from "../src/PostViewer";
import PostEditor from "../src/PostEditor";
const Stack = createStackNavigator();

const PostViewerStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="PostViewer" component={PostViewer} />
      <Stack.Screen name="PostEditor" component={PostEditor}  />
    </Stack.Navigator>
  );
}

export { PostViewerStackNavigator };