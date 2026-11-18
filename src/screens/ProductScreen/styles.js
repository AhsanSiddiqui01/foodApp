const {StyleSheet} = require('react-native');
import ThemeColors from '../../utils/ThemeColors';
import {vh, vw} from '../../utils/Units';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    alignItems:'center'
  },
  listContent: {
    paddingHorizontal: 2 * vw,
    paddingBottom: 12 * vh,
  },
  inputField: {
    width: 92 * vw,
    height: 6.5 * vh,
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderRadius: 14,
  },
  searhBar:{
    marginTop: 2 * vh,
    borderRadius: 14,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#1458C4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  sectionHeader: {
    width: 92 * vw,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 2.5 * vh,
    marginBottom: 1.5 * vh,
  },
  sectionTitle: {
    color: ThemeColors.backgroundBlack,
    fontSize: 2.4 * vh,
  },
  sectionCount: {
    color: ThemeColors.fontLightGrey,
    fontSize: 1.6 * vh,
  },
});
export default styles;
