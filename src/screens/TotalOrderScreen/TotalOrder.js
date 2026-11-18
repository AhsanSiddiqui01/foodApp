import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import styles from './styles'
import { getFoodImage, icons } from '../../assets/images'

// Same "m/d/yy" format the checkout screen saves as orderDetail.date
const todayString = () => {
  const now = new Date();
  return (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear().toString().substr(-2);
}

// Kitchen summary: how many of each dish were ordered today
function TotalOrders() {
  const [posts,setPosts] = useState([])

  // Listen to orders once; onSnapshot keeps the totals live when new orders arrive
  useEffect(()=>{
    const unsubscribe = firestore().collection('orderList')
    .onSnapshot((querySnapShot) => {
      setPosts(querySnapShot.docs.map((doc) => doc.data().orderDetail))
    }, (error) => console.log('TotalOrders error', error))
    return unsubscribe
  },[])

  const today = todayString()
  const { dishes, totalItems, totalAmount, orderCount } = useMemo(() => {
    const byName = {}
    const todays = posts.filter((order) => order && order.date === today)
    todays.forEach((order) => {
      (order.userOrder || []).forEach((food) => {
        const qty = Number(food.QTY) || 1
        if (!byName[food.name]) {
          byName[food.name] = { name: food.name, image: food.image, price: Number(food.price || 0), QTY: 0 }
        }
        byName[food.name].QTY += qty
      })
    })
    const list = Object.values(byName).sort((a, b) => b.QTY - a.QTY)
    return {
      dishes: list,
      totalItems: list.reduce((sum, dish) => sum + dish.QTY, 0),
      totalAmount: list.reduce((sum, dish) => sum + dish.QTY * dish.price, 0),
      orderCount: todays.length,
    }
  }, [posts, today])
  const maxQty = dishes.length > 0 ? dishes[0].QTY : 1

  const renderHeader = () => (
    <View style={styles.hero}>
      <Text style={styles.heroLabel}>Today's Kitchen Order</Text>
      <Text style={styles.heroDate}>{today}  •  {orderCount} {orderCount === 1 ? 'order' : 'orders'}</Text>
      <View style={styles.heroStats}>
        <View style={styles.heroStat}>
          <Text style={styles.heroValue}>{totalItems}</Text>
          <Text style={styles.heroStatLabel}>Total Items</Text>
        </View>
        <View style={styles.heroDivider}/>
        <View style={styles.heroStat}>
          <Text style={styles.heroValue}>{dishes.length}</Text>
          <Text style={styles.heroStatLabel}>Dishes</Text>
        </View>
        <View style={styles.heroDivider}/>
        <View style={styles.heroStat}>
          <Text style={styles.heroValue} numberOfLines={1}>Rs {totalAmount}</Text>
          <Text style={styles.heroStatLabel}>Amount</Text>
        </View>
      </View>
    </View>
  )

  const renderDish = ({ item, index }) => (
    <View style={styles.dishCard}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={getFoodImage(item.image)} resizeMode='cover' style={styles.dishImage}/>
      <View style={styles.dishInfo}>
        <Text style={styles.dishName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.dishPrice}>Rs {item.price} each  •  Rs {item.price * item.QTY}</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${Math.max(8, (item.QTY / maxQty) * 100)}%` }]}/>
        </View>
      </View>
      <Text style={styles.dishQty}>x{item.QTY}</Text>
    </View>
  )

  return (
    <View style={styles.screen}>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.name}
        renderItem={renderDish}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Image source={icons.orderCart} style={styles.emptyIcon}/>
            <Text style={styles.emptyTitle}>Nothing ordered today</Text>
            <Text style={styles.emptyText}>Item totals will appear as orders come in</Text>
          </View>
        }
      />
    </View>
  )
}
export default TotalOrders;
