import React, {Component} from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import styles from './styles';

import TextRegular from '../TextRegular';
import {connect} from 'react-redux';

class Loader extends Component {

  render() {

    return (
      <Modal
        key={'cbt'}
        visible={this.props.loading}
        transparent={true}
        animationType="fade">
        <View style={styles.modalTouchable}>
          <View style={styles.imageBg}>
            <ActivityIndicator size="large" color="#1458C4" />
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

export default connect(mapStateToProps,null)(Loader)
