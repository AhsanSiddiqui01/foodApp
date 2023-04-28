
import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { useEffect,useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import UserOrderCart from '../../components/Sections/UserOrderCard'
import { connect } from 'react-redux'
import messaging from '@react-native-firebase/messaging';
import styles from './styles'
import MainInput from '../../components/Input/MainInput'
function UserOrders(props) {
  const [posts,setPosts] = useState([])
  console.log('checckkkk',props)
  const [arrayList,setArrayList] = useState([])
  useEffect(()=>{
    getUserOrder()
    getFCMToken()
    requestPermission()
  },[]) 
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission()
  }
  const getFCMToken = () => {
    // messaging()
    // .getToken()
    // .then(token => {
    //   firestore().collection('adminToken').add({
    //     token:token,
    //     apcontrol:props.apcontrol
    //   })
    //   console.log('ADDDDMMOTTT=>>>',{token:token,apcontrol:props.apcontrol})
    // })
    firestore().collection('orderList').onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      console.log('chreeeeerrr',changes)
      changes.forEach((change) => {
        if (change.type === 'added') {
          getUserOrder();
        }
      });
    });
  }

  const getUserOrder = async () => {
  
    const list = []
    await firestore().collection('orderList').orderBy('orderDetail','desc').get()
   .then((querySnapShot) => {
     console.log("userOrdersss",querySnapShot.size)
     querySnapShot.forEach(doc => {
       const detailsss = doc.data().orderDetail
       const {time,date,userId,userName,userOrder}  = detailsss
       console.log('orderlIsssfffff',detailsss)
       list.push({
         time,
         date,
         userName,
         userId,
         userOrder
       })
     })
     setPosts(list)
     console.log("userlisttt",posts)
   }) 
       
     }

  const setSearch = () => {
    var searchString = []
    firestore()
    .collection('orderList')
    .orderBy('userName')
    .startAt(searchString)
    .endAt(searchString + '\uf8ff')
    .get()
  }
  return (
    <View style={styles.container}>
        {/* <View style={styles.searhBar}>
          <MainInput
            placeholder=" Search Item"
            style={styles.inputField}
            onChange={(e) => setSearch(e.target.value)}
          />
        </View> */}
        {!!posts && posts.length > 0 ?
        <FlatList
      data={posts}
      // renderItem={renderOrderList}
      contentContainerStyle={{paddingBottom:35}}
      renderItem={({item}) => <UserOrderCart item={item}/>}
      keyExtractor={(item) => item.id}
    />
    :
    <View style={styles.emptyList}>
      <Text>You Have No Today's Orders</Text>
    </View>
    }
     
    </View>
  )
}


const mapStateToProps = (state) => {
  console.log('cartdataa',[state.GeneralReducer])
  return {
    cart: state.GeneralReducer.cart,
    name:state.GeneralReducer.name,
    id:state.GeneralReducer.id,
    apcontrol: state.GeneralReducer.apcontrol,
    my_orders: state.GeneralReducer.my_orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('disopactttt')
  return {
    getNotifications: (success, error) =>
      dispatch(actions.getNotifications(success, error)),
  };
};
// export default Cart;

export default connect(mapStateToProps,mapDispatchToProps)(UserOrders);