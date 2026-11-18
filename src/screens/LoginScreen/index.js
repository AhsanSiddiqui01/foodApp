import React,{Component}from 'react';
import { View, TouchableOpacity,Text,Image } from 'react-native';
import styles from './styles';
import AuthContainer from '../../components/Sections/AuthContainer';
import TouchableHOC from '../../components/Buttons/TouchableHOC';
import PoppinsRegular from '../../components/Text/PoppinsRegular';
import CircularBold from '../../components/Text/CircularBold';
import MainInput from '../../components/Input/MainInput';
import GradientButton from '../../components/Buttons/GradientButton';
import { connect } from 'react-redux';
import actions from '../../redux/actions/index';
import { showToast, isOrderTimeOpen, ORDER_TIME_TEXT } from '../../utils';
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import { icons } from '../../assets/images';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      id:'',
      apcontrol:'',
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),


    };
  }
  _onLogin = () => {
    // console.log('WORKING',apcontrol)
    if (this.state.email.trim() == '') {
      return showToast('Please enter your email');
    }
    if (this.state.password.trim() == '') {
      return showToast('Please enter your password');
    }
    if (this.state.password.length < 6) {
      return showToast('password length must be at least 6 characters');
    }
    // console.log('passing value', this.state);
 
    this.props.login(
      this.state,
      (success) => {
        if(success.apcontrol == 1)
        {
          
          firestore()
          .collection('adminLogin')
          .add({
            time:this.state.time,
            date:this.state.date,
            id:success.id,
            name:success.name,
            apcontrol:success.apcontrol
          })
          messaging()
          .getToken()
          .then(token => {
            firestore().collection('adminToken').add({
              token:token,
              apcontrol:success.apcontrol
            })
          })
        }
        else
        {
          firestore()
          .collection('users')
          .add({
            time:this.state.time,
            date:this.state.date,
            id:success.id,
            name:success.name,
            apcontrol:success.apcontrol
          })
        }
        showToast(success.mess);
        this.setState({ email: '', password: '' });
        // console.log('propsssapcontrol',success.apcontrol)
        {success.apcontrol == 1 ? 
          this.props.navigation.navigate('OrderTabs')
          :
          this.props.navigation.navigate('HomeTabs')
        }
      },
      (error) => {
        showToast(error);
      },
    );
  };
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }
  renderFooter = () => {
    return (
      <TouchableHOC
        onPress={() => this.props.navigation.navigate('SignupScreen')}>
        <PoppinsRegular style={styles.footerText}>
          Don't have an account?
          <PoppinsRegular style={styles.footerTextBlue}>
            {'  '}Sign Up
          </PoppinsRegular>
        </PoppinsRegular>
      </TouchableHOC>
    );
  };
  render() {
    return (
      <View>
        <AuthContainer title="Login" footer={this.renderFooter()}>
        <View style={styles.container}>

          <CircularBold style={styles.title}>
            Welcome Back!
          </CircularBold>
          <PoppinsRegular style={styles.subtitle}>
            Log in to order your favourite lunch
          </PoppinsRegular>
          <MainInput
            placeholder="Enter Email"
            leftIcon={icons.mail}
            style={styles.field}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email })}
          />
          <MainInput
            placeholder="Enter Password"
            leftIcon={icons.lock}
            style={styles.field}
            onChangeText={(t) => this.setState({ password: t })}
            value={this.state.password}
            secureTextEntry={true}
          />
          <GradientButton
            onPress={() => this._onLogin()}
            style={styles.button}
            title={'Login'}
          />
            {
            isOrderTimeOpen() ?
            <View style={styles.timeStyle}>
            <Text style={styles.timeTextActive}>Order Between {ORDER_TIME_TEXT}</Text>
              
            {/* <Text style={styles.timeText}>Time Left</Text>
            <CountDown size={20} until={10800} timeToShow={['H','M','S']}/> */}
            </View>
            :
            <View style={[styles.timeStyle, styles.timeStyleClosed]}>
            <Text style={styles.timeTextInactive}>Service Not Available</Text>
            <Text style={styles.timeTextInactive}>Order Between {ORDER_TIME_TEXT}</Text>
            </View>
            }
      </View>
     
      </AuthContainer>
      
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials, success, error) =>
      dispatch(actions.login(credentials, success, error)),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
