import React from 'react';
import { themeColors } from '../../../theme';
import { View,TextInput,Image } from 'react-native';
import ThemeColors from '../../../utils/ThemeColors';
import { icons } from '../../../assets/images';
import { fonts } from '../../../assets/fonts';
import IconButton from '../../Buttons/IconButton';
import { vw } from '../../../utils/Units';
import styles from './styles';
class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideText: false,
    };
  }
  componentDidMount() {
    this.input.setNativeProps({
      style: {
        fontFamily: fonts.Poppins.light,
      },
    });
  }
  toggleEye = () => {
    this.setState({hideText: !this.state.hideText});
    this.input.setNativeProps({
      style: {
        fontFamily: fonts.Poppins.light,
      },
    });
  };
  renderEye = () => {
    // state.hideText === true means the password is currently visible.
    // The icon mirrors the current state: visible -> open eye, hidden -> closed eye
    const icon = this.state.hideText ? icons.eye : icons.eyeOff;

    return (
      <IconButton
        style={{marginLeft: 2 * vw, padding: 1 * vw}}
        onPress={this.toggleEye}
        icon={icon}
        iconStyle={{height: 5 * vw, width: 5 * vw}}
      />
    );
  };
  renderRightIcon = () => {
    return (
      <IconButton
        style={{marginLeft: 3 * vw}}
        onPress={this.props.onRightIconPress}
        icon={this.props.rightIcon}
      />
    );
  };
  render() {
    var hideText = false;
    if (this.props.secureTextEntry === true) {
      if (this.state.hideText === false) {
        hideText = true;
      } else {
        hideText = false;
      }
    }

    return (
      <View style={[styles.fieldContainer, this.props.style]}>
        {this.props.leftIcon && (
          <Image source={this.props.leftIcon} style={styles.leftIcon} />
        )}
        <TextInput
          placeholder="Text Field"
          placeholderTextColor={themeColors().placeholder}
          {...this.props}
          selectionColor={themeColors().primary}
          style={[styles.field, this.props.fieldStyle]}
          secureTextEntry={hideText}
          ref={(r) => (this.input = r)}
        />
        {this.props.secureTextEntry === true && this.renderEye()}
        {this.props.rightIcon && this.renderRightIcon()}
      </View>
    );
  }
}
export default MainInput;
