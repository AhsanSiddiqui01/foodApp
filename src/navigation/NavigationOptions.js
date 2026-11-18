import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import styles from './styles';
import headerBackground from './headerBackground';
import { View } from 'react-native';
import MenuButton from '../components/Buttons/MenuButton';
import { ThemeToggleButton } from '../components/Sections/ThemeSwitcher';
import MainInput from '../components/Input/MainInput';
import HeaderBrand from './HeaderBrand';
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
    case 'MenuManager':
    case 'MenuItemForm':
    case 'Users':
    case 'UserForm':
    case 'Settings':
      return true;
    default:
      return false;
  }
};
export const getTitle = (activeRouteName) => {

  switch (activeRouteName) {
    case 'OurProudct':
      return () => <HeaderBrand />;
    case 'MenuScreen':
      return 'My Cart';
    case 'History':
      return 'My Orders';
    case 'ProductDetail':
      return 'Details';
    case 'OrderList':
      return 'Orders';
    case 'TotalScreen':
        return 'Kitchen Summary'
    case 'MenuManager':
      return 'Manage Menu';
    case 'MenuItemForm':
      return 'Menu Item';
    case 'Users':
      return 'Users';
    case 'UserForm':
      return 'Add User';
    case 'Settings':
      return 'Settings';
    default:
      return 'No Heading';
  }
};


// Profile/logout avatar sits top-right on every main tab screen, for users and admins alike
export const showHeaderRight = (activeRouteName, navigation, onBackPress) => {
  switch (activeRouteName) {
    case 'OurProudct':
    case 'MenuScreen':
    case 'History':
    case 'OrderList':
    case 'TotalScreen':
    case 'MenuManager':
    case 'Users':
    case 'Settings':
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
  // dark-mode toggle + profile avatar, for every user
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ThemeToggleButton/>
      <MenuButton/>
    </View>
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
    headerTitleAlign: 'left',
    headerTitleStyle: styles.defaultHeaderTitleStyle,
    headerTitleContainerStyle: styles.defaultHeaderLeftContainerStyle,
    headerRightContainerStyle: styles.defaultHeaderRightContainerStyle,
    // headerLeftContainerStyle: styles.defaultHeaderLeftContainerStyle,
    headerStyle: styles.deafultHeaderStyle,
    // white back arrow on the blue header
    headerTintColor: 'white',

  };
};
