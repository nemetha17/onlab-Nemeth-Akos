import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator} from "./DrawerNavigator";
import Login from "../src/Login";
import Registration from "../src/Registration";
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Blogz" component={MainDrawerNavigator} options={{headerLeft: null}} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };