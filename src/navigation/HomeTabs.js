import React from 'react'
import Tab from '../components/Sections/Tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeStack from '../navigation/HomeStack'
import MenuStack from './MenuStack';
import HistoryStack from './HistoryStack';
const TabNavigator = createMaterialTopTabNavigator();
const HomeTabs = () => {
    return(
        <TabNavigator.Navigator
        screenOptions={{
            tabBarShowLabel:false,
            tabBarShowIcon: true,
        }}
        tabBarPosition='bottom'
        tabBar={props => <Tab {...props}/>}
        >
        <TabNavigator.Screen  name="HomeStack" component={HomeStack} />
        <TabNavigator.Screen  name="MenuStack" component={MenuStack} />
        <TabNavigator.Screen  name="HistoryStack" component={HistoryStack}/>


      </TabNavigator.Navigator>
    )
}
export default HomeTabs