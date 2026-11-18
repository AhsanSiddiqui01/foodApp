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
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4 * vw,
    paddingTop: 2 * vh,
    paddingBottom: 1 * vh,
  },
  filter: {
    borderRadius: 20,
    paddingHorizontal: 3.5 * vw,
    paddingVertical: 0.8 * vh,
    backgroundColor: c.card,
    marginRight: 2 * vw,
    marginBottom: 1 * vh,
    borderWidth: 1,
    borderColor: c.border,
  },
  filterActive: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
  filterText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.5 * vh,
    color: c.textSecondary,
  },
  filterTextActive: {
    color: c.onPrimary,
  },
  listContent: {
    paddingBottom: 22 * vh,
  },
  card: {
    width: 92 * vw,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.card,
    borderRadius: 16,
    padding: 3.5 * vw,
    marginBottom: 1.2 * vh,
    elevation: 2,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardBlocked: {
    backgroundColor: c.dangerSoft,
  },
  avatar: {
    width: 12 * vw,
    height: 12 * vw,
    borderRadius: 6 * vw,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.3 * vh,
  },
  info: {
    flex: 1,
    marginHorizontal: 3 * vw,
  },
  name: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.85 * vh,
    color: c.text,
  },
  email: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.45 * vh,
    color: c.textMuted,
  },
  adminLine: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.35 * vh,
    color: c.warning,
  },
  adminLineMissing: {
    color: c.textMuted,
  },
  badges: {
    flexDirection: 'row',
    marginTop: 0.6 * vh,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 2.5 * vw,
    paddingVertical: 0.3 * vh,
    marginRight: 1.5 * vw,
  },
  badgeText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.3 * vh,
  },
  blockedBadge: {
    backgroundColor: c.dangerSoft,
  },
  blockedText: {
    color: c.danger,
  },
  actions: {
    alignItems: 'center',
  },
  blockButton: {
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: c.danger,
    paddingHorizontal: 3 * vw,
    paddingVertical: 0.6 * vh,
    marginBottom: 0.8 * vh,
  },
  unblockButton: {
    borderColor: c.success,
    backgroundColor: c.successSoft,
  },
  blockText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.4 * vh,
    color: c.danger,
  },
  unblockText: {
    color: c.success,
  },
  iconRow: {
    flexDirection: 'row',
  },
  editButton: {
    width: 9 * vw,
    height: 9 * vw,
    borderRadius: 4.5 * vw,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 1.5 * vw,
  },
  deleteButton: {
    width: 9 * vw,
    height: 9 * vw,
    borderRadius: 4.5 * vw,
    backgroundColor: c.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 4.4 * vw,
    height: 4.4 * vw,
    resizeMode: 'contain',
  },
  empty: {
    textAlign: 'center',
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.7 * vh,
    color: c.textMuted,
    marginTop: 6 * vh,
  },
  loader: {
    marginTop: 6 * vh,
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
