import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
export default function OrderButton(props) {
    const {title,onPress,mainContainerStyle} = props
  return (
    <TouchableOpacity style={[styles.addToCartButton,mainContainerStyle]} activeOpacity={.6} onPress={onPress}>
        <Text style={styles.addToCartText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    addToCartButton:{
      width:'100%',
      height:40,
      borderRadius:8,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:20,
      marginTop:10,
    },
    addToCartText:{
          color:'white',
          fontSize:14,
          fontWeight:'700'
    }
  
  })