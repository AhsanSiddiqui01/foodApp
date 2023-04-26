import React from 'react'
import TouchableHOC from '../TouchableHOC';
import styles from './styles';
import { Image } from 'react-native';
import { icons } from '../../../assets/images';
const LogoutButton = (props) => {
    return(
        <TouchableHOC {...props}>
            <Image source={icons.logout} style={styles.drop}/> 
        </TouchableHOC>
    )
}
export default LogoutButton;