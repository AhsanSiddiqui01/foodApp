import React,{Component}from 'react';
import { View, TouchableOpacity,Text,Image } from 'react-native';
import styles from './styles';
import MainInput from '../../components/Input/MainInput';
import GradientButton from '../../components/Buttons/GradientButton';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email:'',


    };
  }
  _onSignup = () => {
    console.log('WORKING')
    if (this.state.name.trim() == '') {
      return showToast('Please enter your user name');
    }
    if (this.state.password.trim() == '') {
      return showToast('Please enter your password');
    }
    if (this.state.password.length < 6) {
      return showToast('password length must be at least 6 characters');
    }
    console.log('passing value', this.state);

    this.props.login(
      this.state,
      (success) => {
        showToast(success);
        this.setState({ name: '', password: '',email:'' });
        this.props.navigation.navigate('AuthNavigator');
      },
      (error) => {
        showToast(error);
      },
    );
  };


  render() {
    return (
      <View>
        <Image style={{width:100,height:100,alignSelf:'center',marginTop:110}}/>
      <View style={styles.container}>
          <MainInput
            placeholder="User Name"
            style={styles.field}
            // keyboardType="name-address"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />
          <MainInput
            placeholder="Email"
            style={styles.field}
            onChangeText={(t) => this.setState({ password: t })}
            value={this.state.password}
            secureTextEntry={true}
          />
          <MainInput
            placeholder="Password"
            style={styles.field}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            secureTextEntry={true}
          />
          <GradientButton
            onPress={() => this._onSignup()}
            style={styles.button}
            title={'Signup'}
          />
             {/* <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
              >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity> */}
      </View>
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

export default connect(null, mapDispatchToProps)(SignupScreen);
