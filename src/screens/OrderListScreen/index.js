import React from 'react'
import { themeColors } from '../../theme';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import { useEffect,useState } from 'react'
import UserOrderCart from '../../components/Sections/UserOrderCard'
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import styles from './styles'
import { icons } from '../../assets/images'
import DateRangeBar from '../../components/Sections/DateRangeBar'
import { presetRange, rangeLabel } from '../../utils/dateRange'
import { ordersInRange, toOrder, staffOrderFilter, activeOrders } from '../../utils/orders'
import { useSelector } from 'react-redux'
import { isAdmin as isOwner } from '../../utils/roles'

function UserOrders() {
  const uid = useSelector((state) => state.GeneralReducer.id)
  const apcontrol = useSelector((state) => state.GeneralReducer.apcontrol)
  const [posts,setPosts] = useState([])
  const [range,setRange] = useState(() => presetRange('today'))
  const [loading,setLoading] = useState(true)
  const [failed,setFailed] = useState(false)

  // New-order pushes come from the notifyAdminsOnNewOrder Cloud Function. Android only shows them
  // by itself when the app is in the background, so show them with notifee while it is open.
  useEffect(()=>{
    notifee.createChannel({ id: 'orders', name: 'New orders', importance: AndroidImportance.HIGH, sound: 'default' })
      .catch((error) => console.log('notification channel error', error))
    return messaging().onMessage(async (remoteMessage) => {
      if (!remoteMessage.notification) {
        return
      }
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: { channelId: 'orders', smallIcon: 'ic_launcher', pressAction: { id: 'default' } },
      })
    })
  },[])

  useEffect(()=>{
    messaging().requestPermission().catch((error) => console.log('notification permission error', error))
  },[])

  // Only the chosen dates are downloaded (default: today), kept live; newest first
  useEffect(()=>{
    setLoading(true)
    setFailed(false)
    // Owner sees every order; an admin only the customers assigned to them
    return ordersInRange(range, staffOrderFilter(apcontrol, uid)).onSnapshot((querySnapShot) => {
      setPosts(querySnapShot.docs.map(toOrder))
      setLoading(false)
    }, (error) => {
      console.log('OrderList snapshot error', error)
      setFailed(true)
      setLoading(false)
    });
  },[range, apcontrol, uid])

  const visible = posts
  // Cancelled orders stay in the list but are left out of the totals
  const counted = activeOrders(posts)
  const sumItems = (order) => order.userOrder.reduce((sum, food) => sum + (Number(food.QTY) || 1), 0)
  const sumAmount = (order) => order.userOrder.reduce((sum, food) => sum + Number(food.price || 0) * (Number(food.QTY) || 1), 0)
  const totalItems = counted.reduce((sum, order) => sum + sumItems(order), 0)
  const totalAmount = counted.reduce((sum, order) => sum + sumAmount(order), 0)

  const renderHeader = () => (
    <View>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.statCardPrimary]}>
          <Text style={[styles.statValue, styles.statValuePrimary]}>{counted.length}</Text>
          <Text style={[styles.statLabel, styles.statLabelPrimary]}>Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalItems}</Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, styles.statValueAmount]} numberOfLines={1}>Rs {totalAmount}</Text>
          <Text style={styles.statLabel}>Amount</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <DateRangeBar value={range} onChange={setRange} />
      <FlatList
        data={visible}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        renderItem={({item}) => <UserOrderCart item={item} showAdmin={isOwner(apcontrol)}/>}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          loading
            ? <ActivityIndicator style={styles.loader} color={themeColors().primary} />
            : (
              <View style={styles.emptyView}>
                <Image source={icons.orderCart} style={styles.emptyIcon}/>
                <Text style={styles.emptyTitle}>
                  {failed ? 'Could not load orders' : range.key === 'today' ? 'No orders today' : 'No orders in this period'}
                </Text>
                <Text style={styles.emptyText}>
                  {failed ? 'Please check your internet and try again.' : `Showing ${rangeLabel(range)}. New orders show up here instantly.`}
                </Text>
              </View>
            )
        }
      />
    </View>
  )
}

export default UserOrders;
