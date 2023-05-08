import React,{useEffect} from 'react';
import {Image, TouchableOpacity,View,Text, useWindowDimensions} from 'react-native';
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler';


const ImageCarousel = ({data}) => {

  const randomColor = () => {
      const red   = Math.floor(Math.random() * 230)
      const blue  = Math.floor(Math.random() * 200)
      const green = Math.floor(Math.random() * 150)
      return `rgb(${red},${green},${blue})`
  }
const {width} = useWindowDimensions()
const SIZE = width * .7;
  return ( 
  <ScrollView  
  horizontal 
  showsHorizontalScrollIndicator={false}
  bounces={false}
  scrollEventThrottle={16}
  snapToInterval={SIZE}
  decelerationRate="fast">
  
  {/* style={[styles.container,{backgroundColor: randomColor()}]} */}
  {data.map((item,index) => {
    return(
        <View style={{width:SIZE}}>
            <View style={styles.imgContainer}>
            <Image
            //   resizeMode='cover'
                style={styles.image}
                source={item.image}
            />
            </View>
        </View>
  
    )
  })}

      
    </ScrollView>
  );
};
export default ImageCarousel;
