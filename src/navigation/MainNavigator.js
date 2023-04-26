import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabs from './HomeTabs';
import AuthNavigator from './AuthNavigator'
import { getNavigationOptions } from './NavigationOptions';
import OrderTabs from './OrderTabs';
const MainStack = createStackNavigator();
const MainStackNavigator = (props) => {

  console.log('MainStackNavigator',props);
  return (
    <MainStack.Navigator
      // initialRouteName='HomeTabs'
      // headerMode="none"
      screenOptions={getNavigationOptions}
      // screenOptions={getNavigationOptions}
      // screenOptions={{
      //     headerTitleStyle:{
      //         color:'white',
      //         fontFamily:fonts.circular.bold
      //     },
      //     headerStyle:{
      //         height:10*vh
      //     }
      // }}
    >

    {/* {props.props.GeneralReducer.access_token == null && (  <MainStack.Screen component={AuthNavigator} name="AuthNavigator" />)}
    {props.props.GeneralReducer.access_token && 
    props.props.GeneralReducer.apcontrol == 1 && (  <MainStack.Screen component={OrderTabs} name="OrderTabs" />)}
    {props.props.GeneralReducer.access_token && 
    props.props.GeneralReducer.apcontrol == 0 &&(<MainStack.Screen component={HomeTabs} name="HomeTabs" />)} */}


     {props.props.GeneralReducer.access_token == null && (  <MainStack.Screen component={AuthNavigator} name="AuthNavigator" />)}
    {props.props.GeneralReducer.access_token && 
    props.props.GeneralReducer.apcontrol == 1 ? 
    <MainStack.Screen component={OrderTabs} name="OrderTabs" />
     :
    props.props.GeneralReducer.access_token &&
    <MainStack.Screen component={HomeTabs} name="HomeTabs" />
    
    }

      {/* <MainStack.Screen component={SignupScreen} name="SignupScreen" /> */}
      {/* <MainStack.Screen component={LoginScreen} name="LoginScreen" /> */}
      
    
    </MainStack.Navigator>
  );
};
class MainNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderSelection = () => {
    return <MainStackNavigator   props={this.props} />;
  };
  render() {
    return <View style={{flex: 1}}>{this.renderSelection()}</View>;
  }
}
const mapState = (state) => {


  return {
    GeneralReducer: state.GeneralReducer,
  };
};
const mapProps = (dispatch) => {
  return {};
};
export default connect(mapState, mapProps)(MainNavigator);
