import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { getFoodImage } from '../../../assets/images';

// One placed order: header (number, date, status), its items, and the total
export default function HistoryCart (props) {
  const { item } = props
  const items = item.userOrder || []
  const lineTotal = (food) => Number(food.price || 0) * (Number(food.QTY) || 1)
  const total = items.reduce((sum, food) => sum + lineTotal(food), 0)
  const itemCount = items.reduce((sum, food) => sum + (Number(food.QTY) || 1), 0)

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderNo}>Order #{item.id.slice(0, 6).toUpperCase()}</Text>
          <Text style={styles.dateTime}>{item.date}  •  {item.time}</Text>
        </View>
        <View style={styles.statusPill}>
          <View style={styles.statusDot}/>
          <Text style={styles.statusText}>Placed</Text>
        </View>
      </View>

      {items.map((food, index) => (
        <View key={`${food.id}-${index}`} style={styles.itemRow}>
          <Image source={getFoodImage(food.image)} style={styles.itemImage} resizeMode='cover'/>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={1}>{food.name}</Text>
            {!!food.notes && (
              <Text style={styles.itemNotes} numberOfLines={1}>{food.notes}</Text>
            )}
          </View>
          <Text style={styles.itemQty}>x{Number(food.QTY) || 1}</Text>
          <Text style={styles.itemPrice}>Rs {lineTotal(food)}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerCount}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
        <Text style={styles.footerTotal}>Total  <Text style={styles.footerAmount}>Rs {total}</Text></Text>
      </View>
    </View>
  );
}
