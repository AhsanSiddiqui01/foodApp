import React from 'react'
import Tab from '../components/Sections/Tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderStack from './OrderStack';
const TabNavigator = createMaterialTopTabNavigator();
const OrderTabs = () => {
    return(
        <TabNavigator.Navigator tabBar={props => <Tab {...props}/>}>
            <TabNavigator.Screen  name="OrderStack" component={OrderStack} />
        </TabNavigator.Navigator>
    )
}
export default OrderTabs