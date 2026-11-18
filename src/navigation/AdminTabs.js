import React from 'react'
import Tab from '../components/Sections/Tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MenuManagerStack from './MenuManagerStack';
import OrderStack from './OrderStack';
import TotalStack from './TotalStack';
import UsersStack from './UsersStack';
import SettingsStack from './SettingsStack';
const TabNavigator = createMaterialTopTabNavigator();

// Owner: manage the menu and users, plus the same Orders and Kitchen screens the admin uses
const AdminTabs = () => {
    return(
        <TabNavigator.Navigator
        screenOptions={{
            tabBarShowLabel:false,
            tabBarShowIcon: true,
            // the menu form has horizontal pickers, so don't switch tabs by swiping
            swipeEnabled: false,
        }}
        tabBarPosition='bottom'
        tabBar={props => <Tab {...props}/>}>
            <TabNavigator.Screen  name="MenuManagerStack" component={MenuManagerStack} />
            <TabNavigator.Screen  name="OrderStack" component={OrderStack} />
            <TabNavigator.Screen  name="TotalStack" component={TotalStack} />
            <TabNavigator.Screen  name="UsersStack" component={UsersStack} />
            <TabNavigator.Screen  name="SettingsStack" component={SettingsStack} />
        </TabNavigator.Navigator>
    )
}
export default AdminTabs
