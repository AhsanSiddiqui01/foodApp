import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { getNavigationOptions } from './NavigationOptions';
import SettingsScreen from '../screens/SettingsScreen';
const SettingsNavigator = createStackNavigator();

const SettingsStack = () => {
  return (
    <SettingsNavigator.Navigator screenOptions={getNavigationOptions}>
      <SettingsNavigator.Screen component={SettingsScreen} name="Settings" />
    </SettingsNavigator.Navigator>
  );
};
export default SettingsStack;
