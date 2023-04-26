import React from 'react'
import { Image } from 'react-native';
import { icons } from '../../../assets/images';
import TouchableHOC from '../TouchableHOC';
import styles from './styles';

const IconButton = (props) => {
    return (
        <TouchableHOC
            {...props}
            // style={{alignItem:'center',justifyContent:'center'},props.style}
        >
            <Image 
                source={props.icon ? props.icon : icons.backBlack}
                style={[styles.icon,props.iconStyle]}
            />
        </TouchableHOC>
    )
}
export default IconButton