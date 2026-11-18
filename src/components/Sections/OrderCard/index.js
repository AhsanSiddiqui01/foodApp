import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getFoodImage, icons } from '../../../assets/images';

// One cart line: photo, name/notes, line price, quantity stepper and remove button
export default function OrderCart (props) {
  const { data, onPress, onIncrease, onDecrease } = props
  const qty = Number(data.QTY) || 1
  return (
    <View style={styles.card}>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={getFoodImage(data.image)}
      />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{data.name}</Text>
          <TouchableOpacity onPress={onPress} hitSlop={{top:10,bottom:10,left:10,right:10}}>
            <Image source={icons.trash} style={styles.trash}/>
          </TouchableOpacity>
        </View>
        {!!data.notes && <Text style={styles.notes} numberOfLines={1}>{data.notes}</Text>}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rs {Number(data.price || 0) * qty}</Text>
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepperBtn} onPress={onDecrease} activeOpacity={0.7}>
              <Text style={styles.stepperText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity style={[styles.stepperBtn, styles.stepperBtnPrimary]} onPress={onIncrease} activeOpacity={0.7}>
              <Text style={[styles.stepperText, styles.stepperTextPrimary]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
