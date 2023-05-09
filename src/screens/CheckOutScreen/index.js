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
import { showToast } from '../../utils';
import OrderButton from '../../components/Buttons/OrderButton';
import messaging from '@react-native-firebase/messaging';
import notificationService from './notificationService';
import notifee,{AndroidStyle} from '@notifee/react-native'
import firestore from '@react-native-firebase/firestore'
import { icons } from '../../assets/images';
import ThemeColors from '../../utils/ThemeColors';
import PoppinsRegular from '../../components/Text/PoppinsRegular';
import { vh } from '../../utils/Units';

function Cart(props) {

  const sum = props.cart

  var result = [];
  sum.forEach(function (items) {
  if (!this[items.name]) {
      this[items.name] = { 
            "price": items.price,
          };
            result.push(this[items.name]);
          }
            this[items.name].price = items.price;
          }, Object.create(null))
      
        
        let TotalPrice = 0;
        
        result.forEach(element => {
          TotalPrice += element.price;
        });
        
        console.log('teststst',TotalPrice);
        
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
      checkTotal()
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

  const [delRecord, setData] = useState()
  
    const deleteRecord = (data,index) => {
      const item = data.cart
      const checkVal = item.splice(index,1)
      setData(checkVal);
    };
  const _renderItem = ({item,index}) =>  {
    
    return(
     <OrderCart
     data={item}
     key={item.id}
     onPress={()=>deleteRecord(props,index)}
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
          totalPrice:TotalPrice,
          userOrder:props.item,
          date:todayDate,
          time:new Date().toLocaleTimeString()
          }
          console.log("firestoreOrders",orderDetail)
          firestore().collection('orderList').add({
        
              orderDetail:orderDetail,
            
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
  const orderList = cartData.GeneralReducer
  const current = new Date();
    const currentHour = current.getHours();
  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backArrow}
          activeOpacity={.9}
          onPress={()=>{
          navigation.navigate('OurProudct',{
            all_product_list:props.all_product_list
          })
        }}
        >
        <Image source={icons.previous} style={styles.backArrowSize}/>
        
        </TouchableOpacity>
        {!!orderList && !!orderList.cart && orderList.cart.length > 0
      ?
      <View>
          <View style={styles.TotalAmount}>
            <Text style={styles.TotalAmtSize}>
              Total Amount: {TotalPrice} Rs
            </Text>
          </View>
      
     
      <FlatList 
      data={orderList.cart}
      contentContainerStyle={{ paddingBottom: 18*vh }}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        <OrderButton 
          title={'Checkout'} 
          onPress={() =>{
            if( currentHour >= 9 && currentHour <=23){
              const item = cartData.GeneralReducer.cart;
              _sendNotification({props,item})
              dispatch({type:actionTypes.CHECK_OUT,payload:''})
             
              setTimeout(() => {
              navigation.navigate('History')
            }, 1000);
            }
            else
            {
              return showToast("We can't received your orders right now");
            }
           
        }} 
          mainContainerStyle={styles.checkOutBtn}
        />
      }
      />
       </View>
      :
      <View style={styles.noDataView}>
        <Image source={icons.emptyBaskey} style={styles.hungryIcon}/>
        <Text style={styles.hungryText}>Hungry?</Text>
        <Text style={styles.emptyText}>You haven't selected anything yet!</Text>
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