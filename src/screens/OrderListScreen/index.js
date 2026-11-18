import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useEffect,useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import UserOrderCart from '../../components/Sections/UserOrderCard'
import messaging from '@react-native-firebase/messaging';
import styles from './styles'
import { icons } from '../../assets/images'

// Same "m/d/yy" format the checkout screen saves as orderDetail.date
const todayString = () => {
  const now = new Date();
  return (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear().toString().substr(-2);
}

function UserOrders() {
  const [posts,setPosts] = useState([])
  const [filter,setFilter] = useState('today')

  useEffect(()=>{
    messaging().requestPermission().catch((error) => console.log('notification permission error', error))
    // All orders, kept live; newest first
    const unsubscribe = firestore().collection('orderList').onSnapshot((querySnapShot) => {
      const list = querySnapShot.docs.map((doc) => {
        const {time,date,userId,userName,userOrder} = doc.data().orderDetail
        const createdAt = doc.data().createdAt
        return {
          id: doc.id,
          time,
          date,
          userName,
          userId,
          userOrder: userOrder || [],
          createdAt: createdAt ? createdAt.toMillis() : 0,
        }
      })
      list.sort((a, b) => b.createdAt - a.createdAt)
      setPosts(list)
    }, (error) => console.log('OrderList snapshot error', error));
    return unsubscribe
  },[])

  const today = todayString()
  const visible = filter === 'today' ? posts.filter((order) => order.date === today) : posts
  const sumItems = (order) => order.userOrder.reduce((sum, food) => sum + (Number(food.QTY) || 1), 0)
  const sumAmount = (order) => order.userOrder.reduce((sum, food) => sum + Number(food.price || 0) * (Number(food.QTY) || 1), 0)
  const totalItems = visible.reduce((sum, order) => sum + sumItems(order), 0)
  const totalAmount = visible.reduce((sum, order) => sum + sumAmount(order), 0)

  const renderHeader = () => (
    <View>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.statCardPrimary]}>
          <Text style={[styles.statValue, styles.statValuePrimary]}>{visible.length}</Text>
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
      <View style={styles.segment}>
        {[['today', 'Today'], ['all', 'All Orders']].map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[styles.segmentBtn, filter === key && styles.segmentBtnActive]}
            activeOpacity={0.8}
            onPress={() => setFilter(key)}
          >
            <Text style={[styles.segmentText, filter === key && styles.segmentTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={visible}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        renderItem={({item}) => <UserOrderCart item={item}/>}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Image source={icons.orderCart} style={styles.emptyIcon}/>
            <Text style={styles.emptyTitle}>{filter === 'today' ? "No orders today" : 'No orders yet'}</Text>
            <Text style={styles.emptyText}>New orders will show up here instantly</Text>
          </View>
        }
      />
    </View>
  )
}

export default UserOrders;
