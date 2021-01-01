import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import AppTabNavigator from './components/appTabNavigator'
import {createAppContainer , createSwitchNavigator} from 'react-navigation'

export default function App() {
return (
<AppContainer/>
);
}

const switchNavigator = createSwitchNavigator({
WelcomeScreen : WelcomeScreen,
BottomTab: AppTabNavigator
})

const AppConatiner = createAppContainer({createSwitchNavigator})
