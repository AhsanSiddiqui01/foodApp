import React,{useEffect} from 'react';
import {Image, TouchableOpacity,View,Text} from 'react-native';
import PoppinsRegular from '../../Text/PoppinsRegular';
import styles from './styles'
import { useNavigation } from '@react-navigation/native';

const ProductCard = (props) => {

  //Dynamically Change Cart Color Fuction
  const randomColor = () => {
      const red   = Math.floor(Math.random() * 230)
      const blue  = Math.floor(Math.random() * 200)
      const green = Math.floor(Math.random() * 150)
      return `rgb(${red},${green},${blue})`
  }

  const navigation = useNavigation();
  return ( 
  <TouchableOpacity
      style={[styles.container,props.style]}
      // style={[styles.container,{backgroundColor: randomColor()}]}
      onPress={()=>{
        navigation.navigate('ProductDetail',{
          foodList:props.foodList.item
        })
      }}
      >
      <Image
      resizeMode='cover'
        style={styles.imgContainer}
        source={{uri: props.foodList?.item.image}}
      />
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        <PoppinsRegular
          style={styles.circularBoardStyle}
          numberOfLines={1}>
         {props.foodList.item.name}
        </PoppinsRegular>
       <PoppinsRegular
          style={styles.priceText}
          numberOfLines={1}>
         {props.foodList.item.price} Rs
        </PoppinsRegular>
        </View>
    </TouchableOpacity>
  );
};
export default ProductCard;
