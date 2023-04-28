import React from 'react'
import Tab from '../components/Sections/Tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderStack from './OrderStack';
import TotalStack from './TotalStack';
const TabNavigator = createMaterialTopTabNavigator();
const OrderTabs = () => {
    return(
        <TabNavigator.Navigator 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarShowIcon: true,
        }}
        tabBarPosition='bottom'
        tabBar={props => <Tab {...props}/>}>
            <TabNavigator.Screen  name="OrderStack" component={OrderStack} />
            <TabNavigator.Screen  name="TotalStack" component={TotalStack} />
        </TabNavigator.Navigator>
    )
}
export default OrderTabs