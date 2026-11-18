import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { getFoodImage } from '../../../assets/images';

// Admin view of one order: customer, time, items (with kitchen notes) and total
export default function UserOrderCart (props) {
  const { item } = props
  const items = item.userOrder || []
  const lineTotal = (food) => Number(food.price || 0) * (Number(food.QTY) || 1)
  const total = items.reduce((sum, food) => sum + lineTotal(food), 0)
  const itemCount = items.reduce((sum, food) => sum + (Number(food.QTY) || 1), 0)
  const customer = item.userName || 'Customer'

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{customer.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.customer} numberOfLines={1}>{customer}</Text>
          <Text style={styles.meta}>#{item.id.slice(0, 6).toUpperCase()}  •  {item.date}  •  {item.time}</Text>
        </View>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
        </View>
      </View>

      {items.map((food, index) => (
        <View key={`${food.id}-${index}`} style={styles.itemBlock}>
          <View style={styles.itemRow}>
            <Image source={getFoodImage(food.image)} style={styles.itemImage} resizeMode='cover'/>
            <Text style={styles.itemName} numberOfLines={1}>{food.name}</Text>
            <Text style={styles.itemQty}>x{Number(food.QTY) || 1}</Text>
            <Text style={styles.itemPrice}>Rs {lineTotal(food)}</Text>
          </View>
          {!!food.notes && (
            <View style={styles.notesBox}>
              <Text style={styles.notesLabel}>Note: <Text style={styles.notesText}>{food.notes}</Text></Text>
            </View>
          )}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Order Total</Text>
        <Text style={styles.footerAmount}>Rs {total}</Text>
      </View>
    </View>
  );
}
