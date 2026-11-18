import { themed } from '../../../theme';
import ThemeColors from '../../../utils/ThemeColors';

const {StyleSheet} = require('react-native');
const {vw, vh} = require('../../../utils/Units');

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  container: {
    width: 10 * vw,
    height: 10 * vh,
    // position:'absolute',
    // bottom:0,
    // left:0
    // backgroundColor:'red'
  },
  animatedContainer: {
    shadowColor: c.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    height: 7.5 * vh,
    width: 92 * vw,
    borderRadius: 6 * vw,
    position: 'absolute',
    bottom: 2 * vh,
    left:  4 * vw,
    backgroundColor: c.card,
  },
  // blur: {borderRadius: 3 * vw, flex: 1},
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 7 * vh,
    width: 90 * vw,
    borderRadius: 0 * vw,
    position: 'absolute',
    bottom: 0 * vh,
    left: 0 * vw,
    backgroundColor: 'rgba(255,255,255,0.0)',
  },
  buttonContainerTwo:{
    alignItems: 'center',
    justifyContent:'space-around',
    flexDirection: 'row',
    height: 7.5 * vh,
    width: 92 * vw,
    borderRadius: 0 * vw,
    position: 'absolute',
    bottom: 0 * vh,
    left: 0 * vw,
    backgroundColor: 'rgba(255,255,255,0.0)',
  },
  tabButton: {
    height: 5 * vh,
    width: 16 * vw,
    borderRadius: 2.5 * vh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: c.primarySoft,
  },
  badge: {
    position: 'absolute',
    top: -0.6 * vh,
    right: 3 * vw,
    minWidth: 5 * vw,
    height: 5 * vw,
    paddingHorizontal: 1 * vw,
    borderRadius: 2.5 * vw,
    backgroundColor: c.accent,
    borderWidth: 2,
    borderColor: c.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: c.onPrimary,
    fontSize: 2.6 * vw,
    fontWeight: '700',
  },
  tabIcon: {
    height: 3 * vh,
    width: 3 * vh,
  },
  titleContainer: {
    width: 100 * vw,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5 * vw,
  },
  label: {
    color: c.primary,
    fontSize: 1.6 * vh,
  },
  value: {
    color: c.text,
    fontSize: 1.6 * vh,
  },
});
export default themed(makeStyles);
