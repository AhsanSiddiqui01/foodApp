import React from 'react';
import { View,TextInput } from 'react-native';
import ThemeColors from '../../../utils/ThemeColors';
import { icons } from '../../../assets/images';
import { fonts } from '../../../assets/fonts';
import IconButton from '../../Buttons/IconButton';
import { vw } from '../../../utils/Units';
import styles from './styles';
class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideText: false,
    };
  }
  render() {
    return (
        <View style={[styles.fieldContainer,this.props.style]}>
        <TextInput
          placeholder="Text Field"
          placeholderTextColor={ThemeColors.darkBlue}
          {...this.props}
          selectionColor={ThemeColors.primary}
          style={[styles.field, this.props.fieldStyle]}
        />
      </View>
    );
  }
}
export default SearchInput;
