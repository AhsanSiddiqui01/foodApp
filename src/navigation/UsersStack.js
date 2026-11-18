import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { getNavigationOptions } from './NavigationOptions';
import UsersScreen from '../screens/UsersScreen';
import UserFormScreen from '../screens/UserFormScreen';
const UsersNavigator = createStackNavigator();

const UsersStack = () => {
  return (
    <UsersNavigator.Navigator screenOptions={getNavigationOptions}>
      <UsersNavigator.Screen component={UsersScreen} name="Users" />
      <UsersNavigator.Screen component={UserFormScreen} name="UserForm" />
    </UsersNavigator.Navigator>
  );
};
export default UsersStack;
