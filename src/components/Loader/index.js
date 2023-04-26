import React, {Component} from 'react';
import {View, Modal, ActivityIndicator,Image} from 'react-native';
import styles from './styles';

import TextRegular from '../TextRegular';
import {connect} from 'react-redux';
import { icons } from '../../assets/images';

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
            <View style={styles.container}>
              <ActivityIndicator size="small" color="black" />
              <Image source={icons.loadingIcon} style={styles.backArrow}/>
      
            </View>
            <View style={styles.container}>
              <TextRegular style={styles.text}>wait please... </TextRegular>
            <Image source={icons.coolIcon} style={styles.smartIcon}/>
              </View>
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
