import React,{useEffect,useState} from 'react';
import { themeColors } from '../../theme';
import { View, Text,Image,FlatList,ActivityIndicator } from 'react-native';
import HistoryCart from '../../components/Sections/HistoryCard';
import DateRangeBar from '../../components/Sections/DateRangeBar';
import styles from './styles';
import { connect } from 'react-redux';
import { icons } from '../../assets/images';
import { presetRange, rangeLabel } from '../../utils/dateRange';
import { ordersInRange, toOrder, isMissingIndex } from '../../utils/orders';

function MyOrders(props) {
  const [posts,setPosts] = useState([])
  const [range,setRange] = useState(() => presetRange('today'))
  const [loading,setLoading] = useState(true)
  const [failed,setFailed] = useState(false)

  // Only this user's orders in the chosen dates, kept live; newest first
  useEffect(()=>{
    if (!props.id) {
      return undefined
    }
    setLoading(true)
    setFailed(false)
    return ordersInRange(range, { userId: props.id }).onSnapshot((querySnapShot) => {
      setPosts(querySnapShot.docs.map(toOrder))
      setLoading(false)
    }, (error) => {
      console.log('History snapshot error', error)
      setFailed(isMissingIndex(error) ? 'index' : 'error')
      setLoading(false)
    });
  },[props.id, range])

  const renderEmpty = () => {
    if (loading) {
      return <ActivityIndicator style={styles.loader} color={themeColors().primary} />
    }
    return (
      <View style={styles.emptyView}>
        <Image source={icons.orderCart} style={styles.emptyIcon}/>
        <Text style={styles.emptyTitle}>
          {failed ? 'Could not load orders' : `No orders ${range.key === 'today' ? 'today' : 'in this period'}`}
        </Text>
        <Text style={styles.emptyText}>
          {failed === 'index'
            ? 'The order history index is still being set up. Please try again in a few minutes.'
            : failed
              ? 'Please check your internet and try again.'
              : 'Choose another date range to see older orders.'}
        </Text>
      </View>
    )
  }

  return (
      <View style={styles.mainContainer}>
        <DateRangeBar value={range} onChange={setRange} />
        <Text style={styles.rangeSummary}>
          {rangeLabel(range)}  •  {posts.length} {posts.length === 1 ? 'order' : 'orders'}
        </Text>
         <FlatList
          data={posts}
          renderItem={({item}) =>
          <HistoryCart
          item={item}
          />
        }
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
      />
      </View>
  );
}
const mapStateToProps = (state) => {
  return {
    id:state.GeneralReducer.id,
  };
};
export default connect(mapStateToProps)(MyOrders);
