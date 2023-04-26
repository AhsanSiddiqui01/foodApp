import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { getNavigationOptions } from './NavigationOptions';
import Cart from '../screens/CheckOutScreen';
const MenuNavigator = createStackNavigator();



const MenuStack = () => {
  return (
    <MenuNavigator.Navigator screenOptions={getNavigationOptions}>
      <MenuNavigator.Screen component={Cart} name="MenuScreen" />
    </MenuNavigator.Navigator>
  );
};
export default MenuStack;
