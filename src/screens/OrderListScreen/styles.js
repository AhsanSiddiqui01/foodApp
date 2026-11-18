import { vh,vw } from "../../utils/Units";
import { fonts } from "../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

const BLUE = '#1458C4';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  listContent: {
    paddingTop: 2 * vh,
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
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 1.6 * vh,
    paddingHorizontal: 3 * vw,
    elevation: 3,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statCardPrimary: {
    backgroundColor: BLUE,
  },
  statValue: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.6 * vh,
    color: ThemeColors.backgroundBlack,
  },
  statValuePrimary: {
    color: 'white',
  },
  statValueAmount: {
    fontSize: 2 * vh,
    color: ThemeColors.orderButton,
    paddingVertical: 0.3 * vh,
  },
  statLabel: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.5 * vh,
    color: ThemeColors.fontLightGrey,
  },
  statLabelPrimary: {
    color: '#DCE8FB',
  },
  segment: {
    width: 92 * vw,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#E9EEF6',
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
    backgroundColor: 'white',
    elevation: 2,
  },
  segmentText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.7 * vh,
    color: ThemeColors.fontLightGrey,
  },
  segmentTextActive: {
    color: BLUE,
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
    color: ThemeColors.backgroundBlack,
    marginTop: 2 * vh,
  },
  emptyText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.7 * vh,
    color: ThemeColors.fontLightGrey,
    marginTop: 0.5 * vh,
  },
})
export default styles;
