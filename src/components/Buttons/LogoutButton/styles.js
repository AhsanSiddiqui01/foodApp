const {StyleSheet} = require('react-native');
const {vh, vw} = require('../../../utils/Units');

const styles = StyleSheet.create({
  drop: {height: 5 * vw, width: 5 * vw, resizeMode: 'contain'},
});
export default styles;
