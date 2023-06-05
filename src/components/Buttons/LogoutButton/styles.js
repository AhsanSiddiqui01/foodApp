const {StyleSheet} = require('react-native');
const {vh, vw} = require('../../../utils/Units');

const styles = StyleSheet.create({
  drop: {
    height: 5 * vw, 
    resizeMode: 'contain',
    // backgroundColor:'red'
  },
});
export default styles;
