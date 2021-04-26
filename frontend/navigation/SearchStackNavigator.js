import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "../src/Search";
import PostViewer from "../src/PostViewer";
const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
      <Stack.Screen name="PostViewer" component={PostViewer}  />
    </Stack.Navigator>
  );
}

export { SearchStackNavigator };