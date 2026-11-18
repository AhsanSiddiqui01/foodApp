import { themed } from '../../theme';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../utils/Units';
import { fonts } from '../../assets/fonts';
import ThemeColors from '../../utils/ThemeColors';

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  container: {
    flex: 1,
    backgroundColor: c.background,
  },
  segment: {
    width: 92 * vw,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: c.segment,
    borderRadius: 14,
    padding: 4,
    marginTop: 2 * vh,
    marginBottom: 1.5 * vh,
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
    fontSize: 1.6 * vh,
    color: c.textMuted,
  },
  segmentTextActive: {
    color: c.primary,
  },
  listContent: {
    paddingBottom: 22 * vh,
  },
  row: {
    width: 92 * vw,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.card,
    borderRadius: 16,
    padding: 3 * vw,
    marginBottom: 1.2 * vh,
    elevation: 2,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  rowImage: {
    width: 15 * vw,
    height: 15 * vw,
    borderRadius: 12,
  },
  rowInfo: {
    flex: 1,
    marginHorizontal: 3 * vw,
  },
  rowName: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.85 * vh,
    color: c.text,
  },
  rowMeta: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.5 * vh,
    color: c.textMuted,
  },
  rowPrice: {
    fontFamily: fonts.Poppins.semiBold,
    color: c.accent,
  },
  iconButton: {
    width: 10 * vw,
    height: 10 * vw,
    borderRadius: 5 * vw,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2 * vw,
  },
  deleteButton: {
    backgroundColor: c.dangerSoft,
  },
  icon: {
    width: 4.6 * vw,
    height: 4.6 * vw,
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 6 * vh,
  },
  emptyCard: {
    width: 92 * vw,
    alignSelf: 'center',
    backgroundColor: c.card,
    borderRadius: 18,
    padding: 5 * vw,
    marginTop: 2 * vh,
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2 * vh,
    color: c.text,
  },
  emptyText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.6 * vh,
    color: c.textSecondary,
    textAlign: 'center',
    marginTop: 0.6 * vh,
  },
  importButton: {
    marginTop: 2 * vh,
    backgroundColor: c.primary,
    borderRadius: 12,
    paddingVertical: 1.4 * vh,
    paddingHorizontal: 6 * vw,
    minWidth: 60 * vw,
    alignItems: 'center',
  },
  importText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.7 * vh,
    color: c.onPrimary,
  },
  fab: {
    position: 'absolute',
    right: 5 * vw,
    bottom: 12 * vh,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.accent,
    borderRadius: 28,
    paddingHorizontal: 5 * vw,
    paddingVertical: 1.6 * vh,
    elevation: 6,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  fabIcon: {
    width: 5 * vw,
    height: 5 * vw,
    resizeMode: 'contain',
    marginRight: 2 * vw,
  },
  fabText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.8 * vh,
    color: c.onPrimary,
  },
});

export default themed(makeStyles);
