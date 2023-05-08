import React from "react";
import styles from "./styles";
import {Text,View,SafeAreaView} from 'react-native'
import ImageCarousel from ".";
import { ScrollView } from "react-native-gesture-handler";

const ImageSlider = () => {
    const data = [
        {
            image: require('../../assets/images/Food-List/image1.jpg')
        },
        {
            image: require('../../assets/images/Food-List/image2.jpg')
        },
        {
            image: require('../../assets/images/Food-List/image3.jpg')
        },
        {
            image: require('../../assets/images/Food-List/image4.jpg')
        },
        {
            image: require('../../assets/images/Food-List/image5.jpg')
        },
        {
            image: require('../../assets/images/Food-List/image6.jpg')
        },
        {
            image: require('../../assets/images/Food-List/image7.jpg')
        },
        {
            image: require('../../assets/images/Food-List/image8.jpg')
        },
      ]
    
    return(
        <ScrollView style={styles.container}>
            <ImageCarousel data={data}/>
        </ScrollView>
    )
}

export default ImageSlider