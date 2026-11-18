import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { getNavigationOptions } from './NavigationOptions';
import MenuManagerScreen from '../screens/MenuManagerScreen';
import MenuItemFormScreen from '../screens/MenuItemFormScreen';
const MenuManagerNavigator = createStackNavigator();

const MenuManagerStack = () => {
  return (
    <MenuManagerNavigator.Navigator screenOptions={getNavigationOptions}>
      <MenuManagerNavigator.Screen component={MenuManagerScreen} name="MenuManager" />
      <MenuManagerNavigator.Screen component={MenuItemFormScreen} name="MenuItemForm" />
    </MenuManagerNavigator.Navigator>
  );
};
export default MenuManagerStack;
