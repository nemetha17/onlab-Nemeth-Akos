import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Myfeed from "../src/Myfeed";
import PostViewer from "../src/PostViewer";
import PostEditor from "../src/PostEditor";
const Stack = createStackNavigator();

const MyfeedStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Myfeed" component={Myfeed} options={{headerShown: false}} />
      <Stack.Screen name="PostViewer" component={PostViewer} />
      <Stack.Screen name="PostEditor" component={PostEditor}  />
    </Stack.Navigator>
  );
}

export { MyfeedStackNavigator };