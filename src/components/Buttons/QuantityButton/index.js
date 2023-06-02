import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
export default function QuantityButton(props) {
    const {title,onPress,mainContainerStyle} = props
  return (
    <TouchableOpacity style={[styles.addToCartButton,mainContainerStyle]} activeOpacity={.6} onPress={onPress} disabled={props.disabled} >
        <Text style={styles.addToCartText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    addToCartButton:{
      width:'100%',
      height:20,
      borderRadius:8,
      justifyContent:'center',
      alignItems:'center',
    },
    addToCartText:{
          color:'white',
          fontSize:14,
          fontWeight:'700'
    }
  
  })