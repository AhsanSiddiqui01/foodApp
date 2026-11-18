import React, { Component } from 'react'
import { Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { showToast } from '../../../utils';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import { fonts } from '../../../assets/fonts';
import { TitleImages } from '../../../assets/images';

const BLUE = '#1458C4';
const RED = '#E5484D';

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
        const isAdmin = this.props.apcontrol == 1
        const name = this.props.name || (isAdmin ? 'Admin' : 'User')
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
            ? this.renderAdminSheet(name, initial)
            : this.renderUserSheet(name)}
          </>
        )
    }

    // Admin: centered card focused on incoming orders
    renderAdminSheet(name, initial){
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
                  <View style={styles.sheet}>
                    <View style={styles.bigAvatar}>
                      <Text style={styles.bigAvatarText}>{initial}</Text>
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    {name.toLowerCase() !== 'admin' && (
                      <View style={[styles.rolePill, styles.rolePillAdmin]}>
                        <Text style={[styles.roleText, styles.roleTextAdmin]}>Admin</Text>
                      </View>
                    )}
                    <Text style={styles.title}>Sign out of foody?</Text>
                    <Text style={styles.message}>
                      You won't see new orders until you sign in again.
                    </Text>
                    <View style={styles.buttonRow}>
                      <TouchableOpacity style={[styles.button, styles.stayButton]} activeOpacity={0.8} onPress={this._close}>
                        <Text style={[styles.buttonText, styles.stayText]}>Stay Signed In</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.button, styles.logoutButton]} activeOpacity={0.8} onPress={this._onLogout}>
                        <Text style={styles.buttonText}>Log Out</Text>
                      </TouchableOpacity>
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
                    <Text style={styles.userTitle}>Leaving already, {name}?</Text>
                    <Text style={styles.message}>
                      Today's menu is still waiting for you. Sign in again anytime to order your lunch.
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

const styles = StyleSheet.create({
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
    color: 'white',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(21,34,43,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sheet: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  bigAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E8F0FD',
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  bigAvatarText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 30,
    color: BLUE,
  },
  name: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 18,
    color: '#15222B',
    marginTop: 12,
  },
  rolePill: {
    backgroundColor: '#E7F6EC',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginTop: 6,
  },
  rolePillAdmin: {
    backgroundColor: '#FFF1EC',
  },
  roleText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 12,
    color: '#2E9E5B',
  },
  roleTextAdmin: {
    color: '#F75938',
  },
  title: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 17,
    color: '#15222B',
    marginTop: 20,
  },
  message: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: '#666666',
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
    borderColor: BLUE,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: RED,
    marginLeft: 10,
    elevation: 3,
  },
  buttonText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 15,
    color: 'white',
  },
  stayText: {
    color: BLUE,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(21,34,43,0.45)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
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
    backgroundColor: '#E3E8F0',
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
    color: '#15222B',
    marginTop: 12,
    textAlign: 'center',
  },
  cartWarning: {
    width: '100%',
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 3,
    borderLeftColor: '#F19C1C',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 16,
  },
  cartWarningText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 13,
    color: '#7A4A00',
  },
  keepButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: BLUE,
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
    color: RED,
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
