const {StyleSheet} = require('react-native');
import ThemeColors from '../../utils/ThemeColors';
import {vh, vw} from '../../utils/Units';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.white,
    justifyContent:'center',alignItems:'center'
  },
  list: {
    width: 100 * vw,
    paddingVertical: 3 * vh,
  },
  listContent: {
    alignItems: 'center',
    paddingTop: 1 * vh,
    paddingBottom: 13 * vh,
  },
  inputField: {
    marginTop: 0 * vh,
    width: 80 * vw,
    height: 5 * vh,
    borderWidth: 0*vw,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf:'center'
  },
});
export default styles;
