import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { getNavigationOptions } from './NavigationOptions';
const HomeNavigator = createStackNavigator();
import { connect } from 'react-redux';
import Product from '../screens/ProductScreen';
// import SignupScreen from '../screens/SignupScreen';
import ProductDetails from '../screens/ProductDetailScreen';
const HomeStack = (props) => {
    return (
        <HomeNavigator.Navigator screenOptions={getNavigationOptions}>
          <HomeNavigator.Screen component={Product} name='OurProudct' /> 
          <HomeNavigator.Screen component={ProductDetails} name='ProductDetail' /> 
          {/* <HomeNavigator.Screen component={SignupScreen} name='SignupScreen'/> */}
        </HomeNavigator.Navigator>
    )
}
const mapState = (state) => {
    return {
        apcontrol: state.GeneralReducer.apcontrol,
        name:state.GeneralReducer.name,
        id:state.GeneralReducer.id
    };
};
export default connect(mapState)(HomeStack);