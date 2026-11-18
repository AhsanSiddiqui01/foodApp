import { themed } from '../../theme';
import { vh,vw } from "../../utils/Units";
import { fonts } from "../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  container: {
    flex: 1,
    backgroundColor: c.background,
  },
  listContent: {
    paddingTop: 1 * vh,
    paddingBottom: 12 * vh,
  },
  statsRow: {
    width: 92 * vw,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: 29 * vw,
    backgroundColor: c.card,
    borderRadius: 16,
    paddingVertical: 1.6 * vh,
    paddingHorizontal: 3 * vw,
    elevation: 3,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statCardPrimary: {
    backgroundColor: c.primary,
  },
  statValue: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.6 * vh,
    color: c.text,
  },
  statValuePrimary: {
    color: c.onPrimary,
  },
  statValueAmount: {
    fontSize: 2 * vh,
    color: c.accent,
    paddingVertical: 0.3 * vh,
  },
  statLabel: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.5 * vh,
    color: c.textMuted,
  },
  statLabelPrimary: {
    color: c.primarySoft,
  },
  segment: {
    width: 92 * vw,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: c.segment,
    borderRadius: 14,
    padding: 4,
    marginTop: 2 * vh,
    marginBottom: 2 * vh,
  },
  segmentBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 1.1 * vh,
    borderRadius: 11,
  },
  segmentBtnActive: {
    backgroundColor: c.card,
    elevation: 2,
  },
  segmentText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.7 * vh,
    color: c.textMuted,
  },
  segmentTextActive: {
    color: c.primary,
  },
  loader: {
    marginTop: 6 * vh,
  },
  emptyView: {
    marginTop: 6 * vh,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 30 * vw,
    height: 30 * vw,
    resizeMode: 'contain',
  },
  emptyTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.2 * vh,
    color: c.text,
    marginTop: 2 * vh,
  },
  emptyText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.7 * vh,
    color: c.textMuted,
    marginTop: 0.5 * vh,
  },
})
export default themed(makeStyles);
