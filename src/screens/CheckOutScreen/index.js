import React,{useEffect,useState} from 'react';
import { View, Text,StyleSheet,Image,ScrollView,SafeAreaView,TouchableOpacity,FlatList,Alert } from 'react-native';
import { getStoredState } from 'redux-persist';
import { persistConfig } from '../../redux';
import { useDispatch,useSelector } from 'react-redux';
import OrderCart from '../../components/Sections/OrderCard';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import actionTypes from '../../redux/actions/ActionTypes';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { showToast, isOrderTimeOpen, ORDER_TIME_TEXT } from '../../utils';
import OrderButton from '../../components/Buttons/OrderButton';
import messaging from '@react-native-firebase/messaging';
import notificationService from './notificationService';
import notifee,{AndroidStyle} from '@notifee/react-native'
import firestore from '@react-native-firebase/firestore'
import { icons } from '../../assets/images';

function Cart(props) {

  // console.log('checkDate',{setDate,setTime})
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const cartData = useSelector(state=>state)
  useEffect(()=>{
    getFCMToken()
    if (requestUserPermission){
      // return fcm token for the device
      messaging().getToken().then(token => {
        console.log('checktokeeensss',token);
      });
    }
    else {
      console.log("FailedTokenStatus", authStatus);
    }
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notificationcausedapptoopenfromquitstate:',
            remoteMessage.notification,
          );
        }
      });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notificationcausedapptoopenfrombackgroundstate:',
          remoteMessage.notification,
        );
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Messagehandledinthebackground!', remoteMessage);
      });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage',JSON.stringify(remoteMessage))
      DisplayNotification(remoteMessage)
    })
    return unsubscribe
  },[]) 

  const getFCMToken = () => {
    messaging()
    .getToken()
    .then(token => {
      firestore().collection('userToken').add({
        token:token,
        apcontrol:props.apcontrol
      })
      console.log('token=>>>',{token:token,apcontrol:props.apcontrol})
    })
  }
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorizationstatus:', authStatus);
    }
  }
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission()
  }
  async function DisplayNotification(remoteMessage) {
    const channelId = await notifee.createChannel({
      id:'default',
      name:'Default Channel'
    })
    await notifee.displayNotification({
      title:remoteMessage.notification.title,
      // body: remoteMessage.notification.body,
      android: {
        channelId,
        style:{
          type: AndroidStyle.BIGTEXT,
          text:remoteMessage.notification.body
        },
        smallIcon:'ic_launcher'
      }
    })
  }

    const deleteRecord = (data,index) => {
      dispatch({type:actionTypes.REMOVE_FROM_CART,index})
    };
  // ADD_TO_CART replaces an item already in the cart, so it doubles as "update quantity"
  const changeQty = (item, QTY) => {
    if (QTY < 1 || QTY > 99) {
      return
    }
    dispatch({type:actionTypes.ADD_TO_CART,payload:item,notes:item.notes,QTY})
  }
  const _renderItem = ({item,index}) =>  {
    const qty = Number(item.QTY) || 1
    return(
     <OrderCart
     data={item}
     onPress={()=>deleteRecord(props,index)}
     onIncrease={()=>changeQty(item, qty + 1)}
     onDecrease={()=>changeQty(item, qty - 1)}
     />
    )
  }
  const _sendNotification = async (props) => {

        //change date format//
        var todayDate = new Date();
        var dd = todayDate.getDate();
        var mm = todayDate.getMonth()+1; 
        var twoDigitYear = new Date().getFullYear().toString().substr(-2)
        // console.log('currentmm',mm + ', DisplaytwoDigit: ' + twoDigitYear);
        todayDate = mm+'/'+dd+'/'+twoDigitYear;
        // console.log('checckdogtadd',todayDate)
        //change date format//
        
        const orderDetail = {
          userName:props.props.name,
          userId:props.props.id,
          userOrder:props.item,
          date:todayDate,
          time:new Date().toLocaleTimeString()
          }
          console.log("firestoreOrders",orderDetail)
          firestore().collection('orderList').add({

              orderDetail:orderDetail,
              createdAt: firestore.FieldValue.serverTimestamp(),

          })
        firestore().collection('adminToken').get().then(querySnap=>{
        querySnap.docs.map(async docSnap=>{
          const adminTokens =  docSnap.data().token
          var userName    = props.props.name
          var ProductName = props.item
          
          let Title  = "Person Name: " + userName + '<br \/>';
          let Body   = "Foods: ";
          
          ProductName.forEach(element => {
            Title = Title;
            Body  = Body  + element.name + ',';
            });
      
          let notificationData = {
            title: Title,
            body:  Body,
            token:adminTokens,
          }
          console.log('chekcnnotifff',notificationData)
          notificationService.sendSingleDeviceNotification(notificationData)
          })
        })
   
  }
  const cart = (cartData.GeneralReducer && cartData.GeneralReducer.cart) || []
  const orderOpen = isOrderTimeOpen()
  const itemCount = cart.reduce((sum, item) => sum + (Number(item.QTY) || 1), 0)
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * (Number(item.QTY) || 1), 0)

  const placeOrder = () => {
    if( !isOrderTimeOpen() ){
      return showToast(`Orders are closed. Order between ${ORDER_TIME_TEXT}`);
    }
    _sendNotification({props,item:cart})
    dispatch({type:actionTypes.CHECK_OUT,payload:''})
    showToast('Order placed successfully')
    navigation.navigate('HistoryStack', { screen: 'History' })
  }

  return (
    <View style={styles.mainContainer}>
      {cart.length > 0
      ?
      <FlatList
      data={cart}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      renderItem={_renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      ListHeaderComponent={
        <Text style={styles.listTitle}>{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</Text>
      }
      ListFooterComponent={
        <View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Bill Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({itemCount})</Text>
              <Text style={styles.summaryValue}>Rs {total}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>Rs {total}</Text>
            </View>
          </View>
          {!orderOpen && (
            <View style={styles.closedBanner}>
              <Text style={styles.closedText}>Orders are closed now. Order between {ORDER_TIME_TEXT}</Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.placeOrderBtn, !orderOpen && styles.placeOrderBtnDisabled]}
            activeOpacity={0.85}
            onPress={placeOrder}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
            <Text style={styles.placeOrderAmount}>Rs {total}</Text>
          </TouchableOpacity>
        </View>
      }
      />
      :
      <View style={styles.noDataView}>
        <Image source={icons.emptyBaskey} style={styles.hungryIcon}/>
        <Text style={styles.hungryText}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Add something delicious from today's menu</Text>
        <TouchableOpacity
          style={styles.browseBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('HomeStack', { screen: 'OurProudct' })}
        >
          <Text style={styles.browseText}>Browse Menu</Text>
        </TouchableOpacity>
      </View>
      }
     </View>
  );
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

export default connect(mapStateToProps,mapDispatchToProps)(Cart);