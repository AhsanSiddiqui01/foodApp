import React from 'react';
import { themeColors } from '../../../theme';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import ThemeColors from '../../../utils/ThemeColors';
import { getFoodImage } from '../../../assets/images';
import { ORDER_STATUSES, getStatus, statusIndex, isCancelled } from '../../../utils/orderStatus';

// One placed order: header (number, date, status), its items, and the total
export default function HistoryCart (props) {
  const { item } = props
  const items = item.userOrder || []
  const lineTotal = (food) => Number(food.price || 0) * (Number(food.QTY) || 1)
  const total = items.reduce((sum, food) => sum + lineTotal(food), 0)
  const itemCount = items.reduce((sum, food) => sum + (Number(food.QTY) || 1), 0)
  const status = getStatus(item.status)
  const currentStep = statusIndex(item.status)
  const cancelled = isCancelled(item.status)

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderNo}>Order #{item.id.slice(0, 6).toUpperCase()}</Text>
          <Text style={styles.dateTime}>{item.date}  •  {item.time}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: status.background }]}>
          <View style={[styles.statusDot, { backgroundColor: status.color }]}/>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      {cancelled ? (
        <View style={styles.cancelBox}>
          <Text style={styles.cancelTitle}>This order was cancelled by the kitchen</Text>
          <Text style={styles.cancelReason}>Reason: {item.cancelReason || 'Not given'}</Text>
        </View>
      ) : (
      /* Progress tracker: Placed → Preparing → Ready → Delivered */
      <View style={styles.tracker}>
        {ORDER_STATUSES.map((step, index) => {
          const reached = index <= currentStep
          return (
            <View key={step.key} style={styles.trackerStep}>
              <View style={styles.trackerRow}>
                <View style={[styles.trackerLine, index === 0 && styles.trackerLineHidden, reached && { backgroundColor: status.color }]}/>
                <View style={[styles.trackerDot, reached && { backgroundColor: status.color, borderColor: status.color }]}/>
                <View style={[styles.trackerLine, index === ORDER_STATUSES.length - 1 && styles.trackerLineHidden, index < currentStep && { backgroundColor: status.color }]}/>
              </View>
              <Text style={[styles.trackerLabel, reached && { color: themeColors().text }]}>{step.label}</Text>
            </View>
          )
        })}
      </View>
      )}

      {items.map((food, index) => (
        <View key={`${food.id}-${index}`} style={[styles.itemRow, cancelled && styles.itemCancelled]}>
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
        <Text style={styles.footerTotal}>Total  <Text style={[styles.footerAmount, cancelled && styles.footerAmountCancelled]}>Rs {total}</Text></Text>
      </View>
    </View>
  );
}
