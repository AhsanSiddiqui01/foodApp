import React, {Component} from 'react';
import { themeColors } from '../../theme';
import {View, Modal, ActivityIndicator} from 'react-native';
import styles from './styles';

import TextRegular from '../TextRegular';
import {connect} from 'react-redux';
import actionTypes from '../../redux/actions/ActionTypes';

// Safety net: if a request never answers, don't block the app forever
const MAX_LOADING_MS = 20000;

class Loader extends Component {
  componentDidUpdate(prev) {
    if (this.props.loading && !prev.loading) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.props.closeLoading, MAX_LOADING_MS);
    } else if (!this.props.loading && prev.loading) {
      clearTimeout(this.timer);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {

    return (
      <Modal
        key={'cbt'}
        visible={this.props.loading}
        transparent={true}
        animationType="fade">
        <View style={styles.modalTouchable}>
          <View style={styles.imageBg}>
            <ActivityIndicator size="large" color={themeColors().primary} />
            <TextRegular style={styles.text}>Please wait</TextRegular>
          </View>
        </View>
      </Modal>
    );
  }
}
mapStateToProps = (state) => {

    console.log('state345',state);
    return {
        
  loading:state?.GeneralReducer?.loading
     
    }
}

const mapDispatchToProps = (dispatch) => ({
  closeLoading: () => dispatch({ type: actionTypes.CLOSE_LOADING }),
});

export default connect(mapStateToProps,mapDispatchToProps)(Loader)
