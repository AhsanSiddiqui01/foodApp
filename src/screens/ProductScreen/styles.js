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
  searhBar:{
            height: 9 * vh,
            width: 90 * vw,
            borderRadius: 2 * vw,
            backgroundColor: ThemeColors.darkBlue,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5 * vw,
            alignItems: 'center',
            shadowColor: "#000",
            marginBottom:20,
            paddingTop:10,
            paddingBottom:10,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            
            elevation: 10,


            marginTop: 2 * vh
  }
});
export default styles;
