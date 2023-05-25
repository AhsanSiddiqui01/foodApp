import React, { useEffect, useState } from "react";
import {Image,View,ScrollView} from 'react-native'
import Swiper from "react-native-swiper/src";
import styles from "./styles";
import { vw } from "../../utils/Units";
const Banner = () => {
    const [bannerData,setBannerData] = useState([])
    useEffect(()=>{
        setBannerData([
        "https://giftmixservices.com/wp-content/uploads/2022/08/KFC-Xtremely-PKR-1220-700x495.png",
        "https://i.ytimg.com/vi/lNOg6C95HUM/maxresdefault.jpg",
        "https://allahwala.com.pk/Images/Uploaded/170Banner_Slider2.jpeg"]
        )
    return () => {
        setBannerData([])
    }
    },[])

return(
    <ScrollView>
    <View style={styles.bannerContainer}>
        <View style={styles.swiper}>
            <Swiper
            style={{height:vw*100}}
            showButton={false}
            autoplay={true}
            autoplayTimeout={5}
            >
            {bannerData.map((item)=>{
                return(
                    <Image 
                    key={item}
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{uri:item}}
                    />
                )
            })}
            </Swiper>
        </View>
    </View>
    </ScrollView>
)
}
export default Banner