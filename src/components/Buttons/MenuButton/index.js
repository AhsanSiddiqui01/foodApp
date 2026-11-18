import React, { Component } from 'react'
import { themed } from '../../../theme';
import { Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { showToast } from '../../../utils';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import { fonts } from '../../../assets/fonts';
import { TitleImages } from '../../../assets/images';
import { isStaff, isAdmin as isOwner, roleLabel, roleOption } from '../../../utils/roles';
import LinearGradient from 'react-native-linear-gradient';


// Header avatar (first letter of the user's name); tapping it opens a sign-out sheet
class MenuButton extends Component {
      state = { visible: false }
      _open = () => this.setState({ visible: true })
      _close = () => this.setState({ visible: false })
      _onLogout = () =>{
        this.setState({ visible: false })
        this.props.logOut((success) => {
          showToast("You have been signed out")
      }, (error) => {
          showToast(error)
      })
      }
    render(){
        const isAdmin = isStaff(this.props.apcontrol)
        const name = this.props.name || (isAdmin ? roleLabel(this.props.apcontrol) : 'User')
        const initial = name.charAt(0).toUpperCase()
        return(
          <>
          <TouchableOpacity
            style={styles.avatar}
            activeOpacity={0.8}
            onPress={this._open}
            hitSlop={{top:8,bottom:8,left:8,right:8}}
          >
            <Text style={styles.avatarText}>{initial}</Text>
          </TouchableOpacity>
          {isAdmin
            ? this.renderAdminSheet(name, initial, roleLabel(this.props.apcontrol))
            : this.renderUserSheet(name)}
          </>
        )
    }

    // Admin / owner: profile-style card with a gradient banner and the avatar overlapping it
    renderAdminSheet(name, initial, role){
        const option = roleOption(this.props.apcontrol)
        const owner = isOwner(this.props.apcontrol)
        return(
          <Modal
            visible={this.state.visible}
            transparent={true}
            animationType="fade"
            onRequestClose={this._close}
          >
            <TouchableWithoutFeedback onPress={this._close}>
              <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.staffCard}>
                    <LinearGradient colors={['#2F7BEA', '#1458C4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.banner}>
                      <View style={[styles.bannerCircle, styles.bannerCircleOne]} />
                      <View style={[styles.bannerCircle, styles.bannerCircleTwo]} />
                    </LinearGradient>

                    <View style={styles.staffAvatarRing}>
                      <View style={[styles.staffAvatar, { backgroundColor: option.background }]}>
                        <Text style={[styles.staffAvatarText, { color: option.color }]}>{initial}</Text>
                      </View>
                    </View>

                    <View style={styles.staffBody}>
                      <Text style={styles.name} numberOfLines={1}>{name}</Text>
                      {name.toLowerCase() !== role.toLowerCase() && (
                        <View style={[styles.rolePill, { backgroundColor: option.background }]}>
                          <Text style={[styles.roleText, { color: option.color }]}>{role}</Text>
                        </View>
                      )}

                      <View style={styles.divider} />

                      <Text style={styles.staffTitle}>Sign out?</Text>
                      <Text style={styles.message}>
                        {owner
                          ? 'You can sign back in anytime to manage the menu, users and orders.'
                          : "You won't see new orders until you sign back in."}
                      </Text>

                      <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.stayButton]} activeOpacity={0.8} onPress={this._close}>
                          <Text style={[styles.buttonText, styles.stayText]}>Stay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.logoutButton]} activeOpacity={0.8} onPress={this._onLogout}>
                          <Text style={styles.buttonText}>Sign Out</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )
    }

    // User: food-themed bottom sheet that nudges them to keep ordering
    renderUserSheet(name){
        const cartCount = this.props.cartCount
        return(
          <Modal
            visible={this.state.visible}
            transparent={true}
            animationType="slide"
            onRequestClose={this._close}
          >
            <TouchableWithoutFeedback onPress={this._close}>
              <View style={styles.bottomOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.bottomSheet}>
                    <View style={styles.handle}/>
                    <Image source={TitleImages.Logo} style={styles.illustration}/>
                    <Text style={styles.userTitle}>Sign out?</Text>
                    <Text style={styles.message}>
                      Are you sure you want to sign out? You'll need to sign in again to order lunch.
                    </Text>
                    {cartCount > 0 && (
                      <View style={styles.cartWarning}>
                        <Text style={styles.cartWarningText}>
                          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart will be removed if you sign out.
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity style={styles.keepButton} activeOpacity={0.85} onPress={this._close}>
                      <Text style={styles.buttonText}>Keep Ordering</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOutLink} activeOpacity={0.6} onPress={this._onLogout}>
                      <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )
    }
}

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 16,
    color: c.onPrimary,
  },
  overlay: {
    flex: 1,
    backgroundColor: c.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sheet: {
    width: '100%',
    backgroundColor: c.card,
    borderRadius: 24,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  staffCard: {
    width: '100%',
    backgroundColor: c.card,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 14,
  },
  banner: {
    height: 92,
    overflow: 'hidden',
  },
  bannerCircle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  bannerCircleOne: {
    width: 140,
    height: 140,
    top: -60,
    right: -30,
  },
  bannerCircleTwo: {
    width: 90,
    height: 90,
    bottom: -45,
    left: 24,
  },
  staffAvatarRing: {
    alignSelf: 'center',
    marginTop: -44,
    padding: 4,
    borderRadius: 48,
    backgroundColor: c.card,
    elevation: 4,
  },
  staffAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  staffAvatarText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 32,
  },
  staffBody: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: c.divider,
    marginTop: 18,
  },
  staffTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 17,
    color: c.text,
    marginTop: 16,
  },
  bigAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: c.primarySoft,
    borderWidth: 3,
    borderColor: c.card,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  bigAvatarText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 30,
    color: c.primary,
  },
  name: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 18,
    color: c.text,
    marginTop: 12,
  },
  rolePill: {
    backgroundColor: c.successSoft,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginTop: 6,
  },
  rolePillAdmin: {
    backgroundColor: c.accentSoft,
  },
  roleText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 12,
    color: c.success,
  },
  roleTextAdmin: {
    color: c.accent,
  },
  title: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 17,
    color: c.text,
    marginTop: 20,
  },
  message: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: c.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stayButton: {
    borderWidth: 1.5,
    borderColor: c.primary,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: c.danger,
    marginLeft: 10,
    elevation: 3,
  },
  buttonText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 15,
    color: c.onPrimary,
  },
  stayText: {
    color: c.primary,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: c.overlay,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: c.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    alignItems: 'center',
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: c.border,
    marginBottom: 16,
  },
  illustration: {
    // login_illustration.png is 490x420
    width: 196,
    height: 168,
    resizeMode: 'contain',
  },
  userTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 19,
    color: c.text,
    marginTop: 12,
    textAlign: 'center',
  },
  cartWarning: {
    width: '100%',
    backgroundColor: c.warningSoft,
    borderLeftWidth: 3,
    borderLeftColor: c.warning,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 16,
  },
  cartWarningText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 13,
    color: c.warning,
  },
  keepButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: c.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    elevation: 4,
  },
  signOutLink: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginTop: 4,
  },
  signOutText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 15,
    color: c.danger,
  },
})

const mapStateToProps = state => {
    return {
        name: state.GeneralReducer.name,
        apcontrol: state.GeneralReducer.apcontrol,
        // LOG_OUT resets the store, so these cart items are lost on sign-out
        cartCount: (state.GeneralReducer.cart || []).reduce(
          (sum, item) => sum + (Number(item.QTY) || 1),
          0,
        ),
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
        logOut: (success, error) =>
            dispatch(actions.logOut(success,error)),

    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(MenuButton)

// live light/dark styles (see src/theme)
const styles = themed(makeStyles);
