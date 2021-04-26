import { StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from "./navigation/StackNavigator";


export default function App() {
  


  return (
    <NavigationContainer>
      <SafeAreaView style = {{ flex :1}}> 
        <StatusBar style="auto" />
          <MainStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}


