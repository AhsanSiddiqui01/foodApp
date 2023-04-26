import React, { Component } from 'react'
import { showToast } from '../../../utils';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import LogoutButton from '../LogoutButton';

class MenuButton extends Component {
      _onLogout = () =>{
        this.props.logOut((success) => {
          showToast("User Logout Successfully")
      }, (error) => { 
          showToast(error)
          this.close()
      })
    
      } 
    render(){
        return(
                <LogoutButton onPress={() => this._onLogout()}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.GeneralReducer.homeData,
        apcontrol: state.GeneralReducer.apcontrol
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
        logOut: (success, error) =>
            dispatch(actions.logOut(success,error)),
  
    };
  };
  
  
export default connect(mapStateToProps,mapDispatchToProps)(MenuButton)