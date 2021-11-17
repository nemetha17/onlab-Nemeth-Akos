import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import PostUpload from "../src/PostUpload";
import {PostViewerStackNavigator} from "./PostViewerStackNavigator";
import {MyfeedStackNavigator} from "./MyfeedStackNavigator";
import {SearchStackNavigator} from "./SearchStackNavigator";
import {ProfileStackNavigator} from "./ProfileStackNavigator";
const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={PostViewerStackNavigator} />
      <Drawer.Screen name="Myfeed" component={MyfeedStackNavigator} />
      <Drawer.Screen name="PostUpload" component={PostUpload} />
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
    </Drawer.Navigator>
  );
}

export { MainDrawerNavigator };