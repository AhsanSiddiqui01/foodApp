const { StyleSheet } = require('react-native');
import ThemeColors from '../../utils/ThemeColors';
import { vh,vw } from '../../utils/Units';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf:'center',
    // justifyContent:'center',
    // marginTop:100,

  },
  title: {
    width: 80 * vw,
    fontSize: 2.8 * vh,
    color: ThemeColors.primary,
    marginBottom: 6 * vh,
    marginTop: 6 * vh
  },
  timeStyle:{
    alignItems:'center',
  },
  timeTextActive:{
    color: ThemeColors.primary,
  },
  timeTextInactive:{
    color: ThemeColors.errorRed,
  },
  field: {
    marginBottom: 2 * vh,
  },
  forgotText: {
    width: 80 * vw,
    textAlign: 'right',
    fontSize: 1.6 * vh,
    textDecorationLine: 'underline',
    color: '#2A73BA',
  },
  button: {
    marginVertical: 3 * vh,
  },
  forgotButton: { marginTop: 1 * vh },
  footerText: {
    color: ThemeColors.fontLightGrey,
    fontSize: 2.3 * vh,
  },
  footerTextBlue: {
    color: ThemeColors.primary,
    fontSize: 2.3 * vh,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
export default styles;
