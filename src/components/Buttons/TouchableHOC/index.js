import React from 'react'
import Ripple from 'react-native-material-ripple';
import ThemeColors from '../../../utils/ThemeColors';

const TouchableHOC = (props) => {
    return (
        <Ripple
            rippleColor={ThemeColors.primary}
            {...props}
        >
            {props.children}
        </Ripple>
    )
}
export default TouchableHOC