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
import { showToast, isOrderTimeOpen } from '../../utils';
import { closedMessage, useServiceSettings } from '../../utils/serviceSettings';
import OrderButton from '../../components/Buttons/OrderButton';
import messaging from '@react-native-firebase/messaging';
import notifee,{AndroidStyle} from '@notifee/react-native'
import firestore from '@react-native-firebase/firestore'
import { icons, getFoodImage, TitleImages } from '../../assets/images';

// Dishes suggested on the empty cart (foodList ids); falls back to the first few menu items
const POPULAR_IDS = ['chicken-biryani', 'zinger-burger', 'beef-pulao', 'kabuli-pulao', 'chicken-burger', 'veg-pizza'];
import { fetchExtras } from '../../utils/extras';
import { now as serverNow, timeZoneOffsetMinutes } from '../../utils/serverTime';

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
      }).catch((error) => console.log('FCM token error', error));
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
      })
      .catch((error) => console.log('initial notification error', error));
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
      console.log('token=>>>',{token:token,apcontrol:props.apcontrol})
      return firestore().collection('userToken').add({
        token:token,
        apcontrol:props.apcontrol
      })
    })
    .catch((error) => console.log('FCM token save error', error))
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
  const [drinks, setDrinks] = useState([])
  const [placing, setPlacing] = useState(false)
  useEffect(()=>{
    fetchExtras().then((extras) => setDrinks(extras.filter((extra) => extra.category === 'drink')))
  },[])
  // Adds one more of a drink (or puts it in the cart the first time)
  const addDrink = (drink) => {
    const inCart = ((cartData.GeneralReducer && cartData.GeneralReducer.cart) || []).find((item) => item.id === drink.id)
    const QTY = inCart ? (Number(inCart.QTY) || 1) + 1 : 1
    if (QTY > 99) {
      return
    }
    dispatch({type:actionTypes.ADD_TO_CART,payload:drink,notes:'',QTY})
  }
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
  const _saveOrder = (props) => {

        //change date format//
        var todayDate = serverNow();
        var dd = todayDate.getDate();
        var mm = todayDate.getMonth()+1; 
        var twoDigitYear = todayDate.getFullYear().toString().substr(-2)
        // console.log('currentmm',mm + ', DisplaytwoDigit: ' + twoDigitYear);
        todayDate = mm+'/'+dd+'/'+twoDigitYear;
        // console.log('checckdogtadd',todayDate)
        //change date format//
        
        const orderDetail = {
          userName:props.props.name,
          userId:props.props.id,
          userOrder:props.item,
          date:todayDate,
          time:serverNow().toLocaleTimeString()
          }
          console.log("firestoreOrders",orderDetail)
          // The customer's assigned admin is read fresh, so a reassignment by the owner applies to
          // the very next order. Admins are notified by the notifyAdminsOnNewOrder Cloud Function.
          return firestore().collection('userProfiles').doc(props.props.id).get()
            .then((profile) => {
              const data = profile.exists ? profile.data() : {}
              return firestore().collection('orderList').add({

                  orderDetail:orderDetail,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                  status: 'placed',
                  // lets the Firestore rules check the order is within this user's local ordering hours
                  tzOffset: timeZoneOffsetMinutes(),
                  // which admin handles this customer's orders (null = only the owner sees it)
                  adminId: data.adminId || null,
                  adminName: data.adminName || null,

              })
            })
  }
  const cart = (cartData.GeneralReducer && cartData.GeneralReducer.cart) || []
  const menu = (cartData.GeneralReducer && cartData.GeneralReducer.all_product_list) || []
  const featured = POPULAR_IDS.map((id) => menu.find((food) => food.id === id)).filter(Boolean)
  const popular = featured.length > 0 ? featured : menu.slice(0, 6)
  useServiceSettings() // re-render when the owner changes the hours
  const orderOpen = isOrderTimeOpen()
  const itemCount = cart.reduce((sum, item) => sum + (Number(item.QTY) || 1), 0)
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * (Number(item.QTY) || 1), 0)

  const placeOrder = () => {
    if( !isOrderTimeOpen() ){
      return showToast(closedMessage());
    }
    if (placing) {
      return
    }
    setPlacing(true)
    // Only clear the cart once the order is actually saved
    _saveOrder({props,item:cart})
      .then(() => {
        dispatch({type:actionTypes.CHECK_OUT,payload:''})
        showToast('Order placed successfully')
        navigation.navigate('HistoryStack', { screen: 'History' })
      })
      .catch((error) => {
        console.log('place order error', error)
        // The rules reject orders outside ordering hours (by the server clock) or from blocked users
        showToast(error.code === 'firestore/permission-denied'
          ? closedMessage()
          : 'Could not place your order. Please check your internet and try again.')
      })
      .finally(() => setPlacing(false))
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
          {drinks.length > 0 && (
            <View style={styles.drinksSection}>
              <Text style={styles.drinksTitle}>Add a drink</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.drinksRow}>
                {drinks.map((drink) => {
                  const inCart = cart.find((item) => item.id === drink.id)
                  const qty = inCart ? Number(inCart.QTY) || 1 : 0
                  return (
                    <View key={drink.id} style={[styles.drinkCard, qty > 0 && styles.drinkCardActive]}>
                      <Image source={getFoodImage(drink.image)} style={styles.drinkImage}/>
                      <Text style={styles.drinkName} numberOfLines={1}>{drink.name}</Text>
                      <Text style={styles.drinkPrice}>Rs {drink.price}</Text>
                      <TouchableOpacity
                        style={[styles.drinkAddBtn, qty > 0 && styles.drinkAddBtnActive]}
                        activeOpacity={0.8}
                        onPress={() => addDrink(drink)}
                      >
                        <Text style={[styles.drinkAddText, qty > 0 && styles.drinkAddTextActive]}>
                          {qty > 0 ? `In cart: ${qty}  +` : '+ Add'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          )}
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
              <Text style={styles.closedText}>{closedMessage()}</Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.placeOrderBtn, (!orderOpen || placing) && styles.placeOrderBtnDisabled]}
            activeOpacity={0.85}
            onPress={placeOrder}
          >
            <Text style={styles.placeOrderText}>{placing ? 'Placing...' : 'Place Order'}</Text>
            <Text style={styles.placeOrderAmount}>Rs {total}</Text>
          </TouchableOpacity>
        </View>
      }
      />
      :
      <ScrollView contentContainerStyle={styles.emptyScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.noDataView}>
          <Image source={TitleImages.EmptyCart} style={styles.hungryIcon}/>
          <Text style={styles.hungryText}>Hungry?</Text>
          <Text style={styles.emptyText}>
            Your cart is empty. Pick something delicious from today's menu.
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('HomeStack', { screen: 'OurProudct' })}
          >
            <Text style={styles.browseText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
        {popular.length > 0 && (
          <View style={styles.popularSection}>
            <Text style={styles.popularTitle}>Popular right now</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularRow}>
              {popular.map((food) => (
                <TouchableOpacity
                  key={food.id}
                  style={styles.popularCard}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('HomeStack', { screen: 'ProductDetail', params: { foodList: food } })}
                >
                  <Image source={getFoodImage(food.image)} style={styles.popularImage} resizeMode='cover'/>
                  <Text style={styles.popularName} numberOfLines={1}>{food.name}</Text>
                  <Text style={styles.popularPrice}>Rs {food.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
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