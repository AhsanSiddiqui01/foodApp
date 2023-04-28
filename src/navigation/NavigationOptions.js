import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import styles from './styles';
import headerBackground from './headerBackground';
import MenuButton from '../components/Buttons/MenuButton';
import MainInput from '../components/Input/MainInput';
export const getNavigationOptions = (props) => {
  var activeRouteName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : props.route.name;
  return {
    ...defaultOptions(activeRouteName, props.navigation),
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: shouldHeaderBeShown(activeRouteName),
    logOutShown: showHeaderRight(activeRouteName),
    headerTitle: getTitle(activeRouteName),
    searchShown: showSearchMenuItem(activeRouteName),
    headerBackground: headerBackground,
  };
};
export const shouldHeaderBeShown = (activeRouteName) => {
  switch (activeRouteName) {
    case 'OurProudct':
    case 'MenuScreen':
    case 'History':
    case 'OrderList':
    case 'TotalScreen':
      return true;
    default:
      return false;
  }
};
export const getTitle = (activeRouteName) => {

  switch (activeRouteName) {
    case 'OurProudct':
      return 'Select Food';
    case 'MenuScreen':
      return 'Ready To Order';
    case 'History':
      return 'My Orders';
    case 'ProductDetail':
      return 'Details';
    case 'OrderList':
      return 'User Orders';
    case 'TotalScreen':
        return 'Total Item'
    default:
      return 'No Heading';
  }
};


export const showHeaderRight = (activeRouteName, navigation, onBackPress) => {
  switch (activeRouteName) {
    case 'OurProudct':
    case 'ProductDetail':
    case 'OrderList':
    case 'TotalScreen':  
      return renderLogoutButton();
    default:
      return false;
  }
};

export const showSearchMenuItem = (activeRouteName) => {
  switch (activeRouteName) {
    case 'OurProudct':
      return searchingMenu();
    default:
      return false;
  }
};

const renderLogoutButton = () => {
  return (
    <MenuButton/>
  );
};
const searchingMenu = () => {
  return(
    <MainInput 
    placeholder="Search"
    style={styles.seachBarStyle}
    />
  )
}
export const defaultOptions = (activeRouteName, navigation) => {
  
  return {
    ...TransitionPresets.SlideFromRightIOS,
    headerRight:  () => showHeaderRight(activeRouteName, navigation),
    headerSearch: () => showSearchMenuItem(activeRouteName),
    headerTitleAlign: 'center',
    headerTitleStyle: styles.defaultHeaderTitleStyle,
    // headerTitleContainerStyle: styles.defaultHeaderTitleContainerStyle,
    headerRightContainerStyle: styles.defaultHeaderRightContainerStyle,
    // headerLeftContainerStyle: styles.defaultHeaderLeftContainerStyle,
    headerStyle: styles.deafultHeaderStyle,

  };
};
