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
    width: 84 * vw,
    fontSize: 3.4 * vh,
    color: ThemeColors.backgroundBlack,
    marginTop: 4 * vh,
  },
  subtitle: {
    width: 84 * vw,
    fontSize: 1.8 * vh,
    color: ThemeColors.fontLightGrey,
    marginTop: 0.5 * vh,
    marginBottom: 4 * vh,
  },
  timeStyle:{
    alignItems:'center',
    alignSelf:'center',
    paddingVertical: 1.2 * vh,
    paddingHorizontal: 5 * vw,
    borderRadius: 20,
    backgroundColor: '#E8F0FD',
  },
  timeStyleClosed:{
    backgroundColor: '#FDECEC',
  },
  timeTextActive:{
    color: ThemeColors.primary,
    fontSize: 1.6 * vh,
  },
  timeTextInactive:{
    color: ThemeColors.errorRed,
    fontSize: 1.6 * vh,
  },
  field: {
    width: 84 * vw,
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
    width: 84 * vw,
    marginTop: 2 * vh,
    marginBottom: 3 * vh,
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
