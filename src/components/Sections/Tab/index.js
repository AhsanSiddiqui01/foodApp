import React from 'react';
import {Animated, View, Text} from 'react-native';
import {connect} from 'react-redux';
import ThemeColors from '../../../utils/ThemeColors';
import styles from './styles';
import {tabIcons} from '../../../assets/images';
import IconButton from '../../Buttons/IconButton';
import {BlurView} from '@react-native-community/blur';
const getIcon = (routeName, isActive) => {

  // console.log('getIconsss',routeName)
  switch (routeName) {
    case 'HomeStack': {
      return isActive ? tabIcons.FoodActive : tabIcons.FoodInactive;
    }
    case 'MenuStack': {
      return isActive ? tabIcons.OrderActive : tabIcons.OrderInactive;
    }
    case 'HistoryStack': {
      return isActive
        ? tabIcons.HistoryActive
        : tabIcons.HistoryInactive;
    }
    case 'OrderStack': {
      return isActive
        ? tabIcons.OrdersActive
        : tabIcons.OrdersInactive;
    }
    case 'SettingsStack': {
      return isActive ? tabIcons.SettingsActive : tabIcons.SettingsInactive;
    }
    case 'UsersStack': {
      return isActive ? tabIcons.UsersActive : tabIcons.UsersInactive;
    }
    case 'MenuManagerStack': {
      return isActive ? tabIcons.MenuActive : tabIcons.MenuInactive;
    }
    case 'TotalStack': {
      return isActive
        ? tabIcons.TotalActive
        : tabIcons.TotalInactive;
    }
  }
};
const renderButtons = (state, descriptors, navigation, position, cartCount) => {
  return state.routes.map((route, index) => {
    var isFocused = index == state.index;
    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };
    const showBadge = route.name === 'MenuStack' && cartCount > 0;
    return (
      <View key={route.key}>
        <IconButton
          rippleColor={ThemeColors.primary}
          rippleCentered={true}
          onPress={onPress}
          onLongPress={onLongPress}
          icon={getIcon(route.name, isFocused)}
          iconStyle={styles.tabIcon}
          style={[styles.tabButton, isFocused && styles.tabButtonActive]}
        />
        {showBadge && (
          <View style={styles.badge} pointerEvents="none">
            <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
          </View>
        )}
      </View>
    );
  });
};
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scale = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.scale, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true // Add This line
    }).start();
  }
  render() {
    const {state, descriptors, navigation, position} = this.props;
    const animatedStyles = {
      transform: [{scaleX: this.scale}, {scaleY: this.scale}],
    };
    return (
      <Animated.View style={[styles.animatedContainer, animatedStyles]}>
        <BlurView
          key={state.index}
          style={styles.blur}
          blurType="light"
          overlayColor="transparent"
          blurAmount={20}
          reducedTransparencyFallbackColor="transparent"
        />
        <View style={styles.buttonContainerTwo}>
          {renderButtons(state, descriptors, navigation, position, this.props.cartCount)}
        </View>
      </Animated.View>
    );
  }
}
// Badge on the cart tab shows the total quantity of items in the cart
const mapStateToProps = (state) => ({
  cartCount: (state.GeneralReducer.cart || []).reduce(
    (sum, item) => sum + (Number(item.QTY) || 1),
    0,
  ),
});
export default connect(mapStateToProps)(Tab);
