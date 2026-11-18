import ThemeColors from '../../../utils/ThemeColors';

const {StyleSheet} = require('react-native');
const {vw, vh} = require('../../../utils/Units');

const styles = StyleSheet.create({
  container: {
    width: 10 * vw,
    height: 10 * vh,
    // position:'absolute',
    // bottom:0,
    // left:0
    // backgroundColor:'red'
  },
  animatedContainer: {
    shadowColor: '#1458C4',
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
    backgroundColor: ThemeColors.white,
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
    width: 18 * vw,
    borderRadius: 2.5 * vh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#E8F0FD',
  },
  badge: {
    position: 'absolute',
    top: -0.6 * vh,
    right: 3 * vw,
    minWidth: 5 * vw,
    height: 5 * vw,
    paddingHorizontal: 1 * vw,
    borderRadius: 2.5 * vw,
    backgroundColor: ThemeColors.orderButton,
    borderWidth: 2,
    borderColor: ThemeColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: ThemeColors.white,
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
    color: ThemeColors.primary,
    fontSize: 1.6 * vh,
  },
  value: {
    color: '#050E37',
    fontSize: 1.6 * vh,
  },
});
export default styles;
