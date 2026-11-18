import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styles from './styles'
import { getFoodImage, icons } from '../../assets/images'
import DateRangeBar from '../../components/Sections/DateRangeBar'
import { presetRange, rangeLabel } from '../../utils/dateRange'
import { ordersInRange, toOrder, staffOrderFilter, activeOrders } from '../../utils/orders'
import { useSelector } from 'react-redux'

// Kitchen summary: how many of each dish were ordered in the chosen dates (default: today)
function TotalOrders() {
  const uid = useSelector((state) => state.GeneralReducer.id)
  const apcontrol = useSelector((state) => state.GeneralReducer.apcontrol)
  const [posts,setPosts] = useState([])
  const [range,setRange] = useState(() => presetRange('today'))

  // Only the chosen dates are downloaded; onSnapshot keeps the totals live as orders arrive
  useEffect(()=>{
    return ordersInRange(range, staffOrderFilter(apcontrol, uid)).onSnapshot((querySnapShot) => {
      // cancelled orders are not cooked, so they are left out of the kitchen totals
      setPosts(activeOrders(querySnapShot.docs.map(toOrder)))
    }, (error) => console.log('TotalOrders error', error))
  },[range, apcontrol, uid])

  const { dishes, totalItems, totalAmount, orderCount } = useMemo(() => {
    const byName = {}
    posts.forEach((order) => {
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
      orderCount: posts.length,
    }
  }, [posts])
  const maxQty = dishes.length > 0 ? dishes[0].QTY : 1

  const renderHeader = () => (
    <View style={styles.hero}>
      <Text style={styles.heroLabel}>{range.key === 'today' ? "Today's Kitchen Order" : 'Kitchen Summary'}</Text>
      <Text style={styles.heroDate}>{rangeLabel(range)}  •  {orderCount} {orderCount === 1 ? 'order' : 'orders'}</Text>
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
      <DateRangeBar value={range} onChange={setRange} />
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
            <Text style={styles.emptyTitle}>
              {range.key === 'today' ? 'Nothing ordered today' : 'Nothing ordered in this period'}
            </Text>
            <Text style={styles.emptyText}>Item totals will appear as orders come in</Text>
          </View>
        }
      />
    </View>
  )
}
export default TotalOrders;
