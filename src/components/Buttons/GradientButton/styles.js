import { themed } from '../../../theme';
const { StyleSheet } = require("react-native");

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
    buttonContainer: {
        borderRadius: 12,
        backgroundColor: c.card,
        elevation: 6,
        shadowColor: c.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    grad:{
        borderRadius: 12,
        // flex:1,
        height: 52,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color: c.onPrimary,
        fontSize: 16,
        letterSpacing: 0.5,
    }
})
export default themed(makeStyles);