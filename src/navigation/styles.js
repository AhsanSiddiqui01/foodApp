import {StyleSheet} from 'react-native';
import {fonts} from '../assets/fonts';
import {vh, vw} from '../utils/Units';

const styles = StyleSheet.create({
  defaultHeaderTitleStyle: {
    color: 'white',
    fontFamily: fonts.circular.bold,
    fontSize: 2.6 * vh,
    paddingBottom: 2 * vh,
  },
  defaultHeaderTitleContainerStyle: {},
  defaultHeaderRightContainerStyle: {
    paddingBottom: 2 * vh,
    paddingRight: 5 * vw,
  },
  defaultHeaderLeftContainerStyle: {
    paddingBottom: 2 * vh,
    paddingLeft: 5 * vw,
  },
  deafultHeaderStyle: {
    height: 13 * vh,
    // paddingBottom: 0 * vh,
  },
  seachBarStyle: {
    top:40,
    width:250,
    marginRight:40,
    backgroundColor:'white'
  }
});
export default styles;
