import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { getNavigationOptions } from './NavigationOptions';
import TotalOrder from '../screens/TotalOrderScreen/TotalOrder'
const MenuNavigator = createStackNavigator();



const TotalStack = () => {
  return (
    <MenuNavigator.Navigator screenOptions={getNavigationOptions}>
      <MenuNavigator.Screen component={TotalOrder} name="TotalScreen" />
    </MenuNavigator.Navigator>
  );
};
export default TotalStack;
