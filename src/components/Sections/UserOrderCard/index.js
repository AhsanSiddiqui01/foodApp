import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import styles from './styles';
import { getFoodImage } from '../../../assets/images';
import { getStatus, nextStatus, canCancel, isCancelled } from '../../../utils/orderStatus';
import { cancelOrder } from '../../../utils/orders';
import { showToast } from '../../../utils';
import CancelOrderModal from '../CancelOrderModal';

// Admin view of one order: customer, status, items (with kitchen notes), total, the next-step
// action and a cancel option (with a reason the customer sees)
export default function UserOrderCart (props) {
  const { item } = props
  const myName = useSelector((state) => state.GeneralReducer.name)
  const [updating, setUpdating] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const items = item.userOrder || []
  const lineTotal = (food) => Number(food.price || 0) * (Number(food.QTY) || 1)
  const total = items.reduce((sum, food) => sum + lineTotal(food), 0)
  const itemCount = items.reduce((sum, food) => sum + (Number(food.QTY) || 1), 0)
  const customer = item.userName || 'Customer'
  const status = getStatus(item.status)
  const next = nextStatus(item.status)
  const cancelled = isCancelled(item.status)
  const orderLabel = `#${item.id.slice(0, 6).toUpperCase()}`

  const advance = () => {
    if (!next || updating) {
      return
    }
    setUpdating(true)
    firestore().collection('orderList').doc(item.id)
      .update({ status: next.key, statusUpdatedAt: firestore.FieldValue.serverTimestamp() })
      .catch((error) => {
        console.log('status update error', error)
        showToast('Could not update the order. Please try again.')
      })
      .finally(() => setUpdating(false))
  }

  const confirmCancel = (reason) => {
    setCancelling(true)
    cancelOrder(item.id, { reason, cancelledBy: myName })
      .then(() => {
        setCancelOpen(false)
        showToast(`Order ${orderLabel} cancelled`)
      })
      .catch((error) => {
        console.log('cancel order error', error)
        showToast('Could not cancel the order. Please try again.')
      })
      .finally(() => setCancelling(false))
  }

  return (
    <View style={[styles.card, cancelled && styles.cardCancelled]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{customer.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.customer} numberOfLines={1}>{customer}</Text>
          <Text style={styles.meta}>{orderLabel}  •  {item.date}  •  {item.time}</Text>
          {props.showAdmin && (
            <Text style={[styles.adminLine, !item.adminId && styles.adminLineMissing]} numberOfLines={1}>
              {item.adminId ? `Admin: ${item.adminName || 'Assigned'}` : 'Unassigned · only you can see this'}
            </Text>
          )}
        </View>
        <View style={[styles.statusPill, { backgroundColor: status.background }]}>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      {cancelled && (
        <View style={styles.cancelBox}>
          <Text style={styles.cancelTitle}>Cancelled{item.cancelledBy ? ` by ${item.cancelledBy}` : ''}</Text>
          <Text style={styles.cancelReason}>Reason: {item.cancelReason || 'Not given'}</Text>
        </View>
      )}

      {items.map((food, index) => (
        <View key={`${food.id}-${index}`} style={[styles.itemBlock, cancelled && styles.itemCancelled]}>
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
        <Text style={styles.footerLabel}>{itemCount} {itemCount === 1 ? 'item' : 'items'}  •  Order Total</Text>
        <Text style={[styles.footerAmount, cancelled && styles.footerAmountCancelled]}>Rs {total}</Text>
      </View>

      {(next || canCancel(item.status)) && (
        <View style={styles.actionRow}>
          {canCancel(item.status) && (
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={0.85}
              onPress={() => setCancelOpen(true)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          )}
          {next && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnFlex, { backgroundColor: next.color }]}
              activeOpacity={0.85}
              onPress={advance}
              disabled={updating}
            >
              {updating
                ? <ActivityIndicator color="white" />
                : <Text style={styles.actionText}>{next.action}</Text>}
            </TouchableOpacity>
          )}
        </View>
      )}

      <CancelOrderModal
        visible={cancelOpen}
        orderLabel={`order ${orderLabel}`}
        saving={cancelling}
        onConfirm={confirmCancel}
        onClose={() => setCancelOpen(false)}
      />
    </View>
  );
}
