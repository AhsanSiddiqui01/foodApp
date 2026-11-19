import {StyleSheet} from 'react-native';
import {fonts} from '../assets/fonts';
import {vh, vw} from '../utils/Units';

const styles = StyleSheet.create({
  defaultHeaderTitleStyle: {
    color: 'white',
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.4 * vh,
  },
  defaultHeaderTitleContainerStyle: {},
  defaultHeaderRightContainerStyle: {
    paddingRight: 5 * vw,
  },
  defaultHeaderLeftContainerStyle: {
    paddingLeft: 5 * vw,
  },
  deafultHeaderStyle: {
    height: 8.5 * vh,
    backgroundColor: '#1458C4',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackground: {
    flex: 1,
  },
  // screen width - left/right header padding (5vw each) - theme button + avatar (~110)
  brandContainer: {
    width: 90 * vw - 110,
  },
  greeting: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.2 * vh,
    color: 'white',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0.2 * vh,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4ADE80',
    marginRight: 6,
  },
  statusDotClosed: {
    backgroundColor: '#FF8A8A',
  },
  statusText: {
    flexShrink: 1,
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.5 * vh,
    color: '#DCE8FB',
  },
  seachBarStyle: {
    top:40,
    width:250,
    marginRight:40,
    backgroundColor:'white'
  }
});
export default styles;
