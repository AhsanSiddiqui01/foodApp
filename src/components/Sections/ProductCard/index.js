import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import PoppinsRegular from '../../Text/PoppinsRegular';
import PoppinsMedium from '../../Text/PoppinsMedium';
import styles from './styles'
import { getFoodImage, icons } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';

const ProductCard = (props) => {
  const navigation = useNavigation();
  const item = props.foodList.item;
  const openDetail = () => {
    navigation.navigate('ProductDetail',{
      foodList:item
    })
  };
  return (
  <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={openDetail}
      >
      <Image
        resizeMode='cover'
        style={styles.imgContainer}
        source={getFoodImage(item.image)}
      />
      <View style={styles.info}>
        <PoppinsMedium style={styles.name} numberOfLines={1}>
          {item.name}
        </PoppinsMedium>
        {!!item.shop && (
          <PoppinsRegular style={styles.shop} numberOfLines={1}>
            {item.shop}
          </PoppinsRegular>
        )}
        <View style={styles.footer}>
          <PoppinsMedium style={styles.price}>
            Rs {item.price}
          </PoppinsMedium>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={openDetail}>
            <Image source={icons.plusWhite} style={styles.addIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductCard;
