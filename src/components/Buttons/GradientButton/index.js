import React,{Component} from 'react'
import TouchableHOC from '../TouchableHOC';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import PoppinsMedium from '../../Text/PoppinsMedium';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import ThemeColors from '../../../utils/ThemeColors';
import { showToast } from '../../../utils';
class GradientButton extends Component {
    onPressHandler = () => {
        var current = new Date();
        var currentHour = current.getHours();
        // console.log('logHourr',currentHour)
        if( currentHour >= 1 && currentHour <=23){
            if (this.props.globalLoading != true && this.props.loading != true) {
                if (this.props.onPress) {
                    console.log('global ', this.props.globalLoading, ' loading ', this.props.loading);
                    this.props.onPress()
                }
            }
        } else {
            
            return showToast('You can not login right now');
        }
       
    }
    render() {
        return (
            <TouchableHOC
            rippleColor={'white'}
            style={[styles.buttonContainer, this.props.style]}
            onPress={this.onPressHandler}
            >
                <LinearGradient colors={['#1458c4', '#1458c4']} style={styles.grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    {(this.props.globalLoading === true || this.props.loading === true) ? <ActivityIndicator size='small' color={ThemeColors.white} /> : <PoppinsMedium style={[styles.text, this.props.titleStyle]}>
                        {this.props.title}
                    </PoppinsMedium>}
                </LinearGradient>
            </TouchableHOC>
        )
    }
}
const mapStates = state => {
    return {
        globalLoading: false
    }
}
export default  connect(mapStates, null)(GradientButton)