import React,{useEffect,useState} from 'react';
import { View, Text,Image,FlatList } from 'react-native';
import HistoryCart from '../../components/Sections/HistoryCard';
import firestore from '@react-native-firebase/firestore'
import styles from './styles';
import { connect } from 'react-redux';
import { icons } from '../../assets/images';

function MyOrders(props) {
  const [posts,setPosts] = useState([])

  // Only this user's orders, kept live; newest first
  useEffect(()=>{
    if (!props.id) {
      return undefined
    }
    const unsubscribe = firestore().collection('orderList')
      .where('orderDetail.userId', '==', props.id)
      .onSnapshot((querySnapShot) => {
        const list = querySnapShot.docs.map((doc) => {
          const {time,date,userId,userName,userOrder} = doc.data().orderDetail
          const createdAt = doc.data().createdAt
          return {
            id: doc.id,
            time,
            date,
            userName,
            userId,
            userOrder,
            createdAt: createdAt ? createdAt.toMillis() : 0,
          }
        })
        list.sort((a, b) => b.createdAt - a.createdAt)
        setPosts(list)
      }, (error) => console.log('History snapshot error', error));
    return unsubscribe
  },[props.id])

  return (
      <View style={styles.mainContainer}>
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
          ListEmptyComponent={()=>
            <View style={styles.emptyView}>
              <Image source={icons.orderCart} style={styles.emptyIcon}/>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptyText}>Your placed orders will appear here</Text>
            </View>
    }
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
