import { themed } from '../../theme';
import { vh, vw } from "../../utils/Units";
import { fonts } from "../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
    mainContainer:{
        flex:1,
        backgroundColor: c.background,
      },
      listContent:{
        paddingTop: 1 * vh,
        paddingBottom: 12 * vh,
      },
      rangeSummary:{
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.5 * vh,
        color: c.textMuted,
        paddingHorizontal: 4 * vw,
        marginTop: 0.5 * vh,
        marginBottom: 0.5 * vh,
      },
      loader:{
        marginTop: 8 * vh,
      },
      emptyView:{
        marginTop: 12 * vh,
        alignItems:'center',
      },
      emptyIcon:{
        width: 32 * vw,
        height: 32 * vw,
        resizeMode:'contain',
        opacity: 0.9,
      },
      emptyTitle:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.2 * vh,
        color: c.text,
        marginTop: 2 * vh,
      },
      emptyText:{
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.7 * vh,
        color: c.textMuted,
        marginTop: 0.5 * vh,
      },
})
export default themed(makeStyles);
