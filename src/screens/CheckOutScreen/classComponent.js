// import React,{Component, useEffect} from 'react';
// import { View, Text,StyleSheet,Image,ScrollView,SafeAreaView,TouchableOpacity,FlatList } from 'react-native';
// // import { useDispatch,useSelector } from 'react-redux';
// import Components from '../../components';
// import { connect } from 'react-redux';
// import OrderCart from '../../components/Sections/OrderCard';
// import styles from './styles';
// import actions from '../../redux/actions';
// // import { useNavigation } from '@react-navigation/native';
// import actionTypes from '../../redux/actions/ActionTypes';

// class Cart extends Component{
//   constructor(props) {
//     super(props);
//     const { dispatch } = props;
//     this.boundedActions = ({type:actionTypes.CHECK_OUT,payload:''}, dispatch);
//     }
//   sendNotification =() => {
//     // console.log('notificationData',orderList.cart)
//   }
//   // navigation = useNavigation();
//   // dispatch = useDispatch()
//   // cartData = useSelector(state=>state)

//   _getProductDetail = () => {
//     this.props.getProductDetail(
//       (success) => {
//         if (success) {
//           this.setState({
//             refreshing: false,
//           });
//         }
//       },
//       (error) => {
//         this.setState({
//           refreshing: false,
//         });
//       },
//     );
//   };
//   _renderItem = (item) => {
//     <OrderCart
//     data={item}
//     isCart={true}
//    //  onPress={()=>{}}
//     />
//   };
//   render(){
//     // var orderList = cartData.GeneralReducer
//     return(
//       <View style={styles.mainContainer}>
   
//       <FlatList 
//       // data={orderList.cart}
//       contentContainerStyle={{ paddingBottom: 70 }}
//       renderItem={this._renderItem()}
//       keyExtractor={key=>key.id}
//       ListHeaderComponent={
//         <Components.AppButton 
//           title={'Checkout'} 
//           onPress={() =>{
//             sendNotification()
//             // dispatch({type:actionTypes.CHECK_OUT,payload:''})
//             setTimeout(() => {
//             navigation.navigate('History')
//           }, 1000);}} 
//           mainContainerStyle={styles.checkOutBtn}
//         />
//       }
//       />
      
//       <View style={styles.noDataView}>
//         <Text>No Item Selected</Text>
//       </View>
      
     
//      </View>
//     )
//   }
// }
// const mapStateToProps = (state) => {
//   console.log('Product state',state)
//   return {
//     all_product_list: state.GeneralReducer.all_product_list,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getProductDetail: (success, error) =>
//       dispatch(actions.getProductDetail(success, error)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Cart);


import React,{useEffect,useState} from 'react';
import { View, Text,StyleSheet,Image,ScrollView,SafeAreaView,TouchableOpacity,FlatList,Alert } from 'react-native';
import { getStoredState } from 'redux-persist';
import { persistConfig } from '../../redux';
import { useDispatch,useSelector } from 'react-redux';
// import Components from '../../components';
import OrderCart from '../../components/Sections/OrderCard';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import actionTypes from '../../redux/actions/ActionTypes';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import config from '../../Api/Config';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';
import { showToast } from '../../utils';
import OrderButton from '../../components/Buttons/OrderButton';
import { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Cart(props) {
  // console.log('CARTTTTT',props)
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const cartData = useSelector(state=>state)
  // useEffect(()=>{
  //   let url = `${config.ReportUrl}notificationApi.php`;
  //   fetch(url,{
  //     method:'POST',
  //     headers: {
  //       'Content-type':"application/json"
  //     },
  //     body:JSON.stringify()
  //   })
  //   console.log('orderList',orderList.cart)
  // },[])


    useEffect(()=>{

    
    
  },[])
 
 
  NotiPermission =() => {
    firebase.messaging().requestPermission()
    .then(()=>{
      console.log("User has authorised")
    })
    .catch(error => {
      console.log("User rejected Permissions")
    })
  }

  componentDidMount =async () => {
    firebase.messaging().hasPermission()
    .then(enable => {
      if(enable) {
        console.log("user has permission")
      }
      else
      {
        console.log("user don't have permission")
        this.NotiPermission()
      }
    })
    let fcmToken =  await AsyncStorage.getItem('fcmToken');
    console.log("fcmToken from AsyncStorage",fcmToken)
    if(!fcmToken){
      fcmToken=  await firebase.messaging().getToken()
      if(fcmToken){
        console.log("fcmToken from firebase:", fcmToken)
        await AsyncStorage.setItem('fcmToken',fcmToken)
      }
    }
  }



  const _sendNotification = async () => {
    const FIREBASE_API_KEY = "AIzaSyAXBl5ozVVZ1Tdj--OdpttDKcl6rAYz-6g";
    const message = {
      registration_ids:[""],
      notification: {
        title:"abccc",
        body:"deffff",
        "vibrate":1,
        "sound":1,
        "show_in_foreground":true,
        "priority":"high",
        "content_available":true,
      }
    }
    let headers = new Headers({
      "Content-Type":"application/json",
      "Authorization":"key=" + FIREBASE_API_KEY
    })
    let response = await fetch("https://fcm.googleapis.com/fcm/send", {method:"POST",headers,body:JSON.stringify(message)})
    response = await response.json()
    console.log(response)
    // let {cartItem} = item
    // let q = item
    // let url = `${config.ReportUrl}notificationApi.php`;

    // fetch(url, {
    //   method : 'POST',
    //   headers : {
    //     'Accept' : 'application/json',
    //     'Content-Type' : 'application/json'
    //   },
    //   body : JSON.stringify({
    //     cartItem : cartItem,
    //     Orderan : q
    //   })
    // })
    //   .then(res => res.json())
    //   .catch(err => Alert.alert('ERROR',err.toString(),
    //                 [{text: 'OK'}],{ cancelable: false }))
    }

    // console.log('myitemssssss',item)
    // console.log('chekcItemsss',cartItem)
    // getStoredState(persistConfig).then((_state) => {
    //   let headers = {
    //     "Content-Type"   : "application/octet-stream",
    //     "x-rapidapi-host":"ebizcommerce.atwebpages.com",
    //     Accept: 'application/json',
    //   };
    //   // console.log('urlaaaa  ', url, '  ', _state);
    //   let dataToSend = JSON.stringify({result: orderList.cart});
    //   console.log(dataToSend);
    //   let requestConfig = {
    //     method: 'POST',
    //     headers: new Headers(headers),
    //     params:  dataToSend,
    //   };
    //   fetch(url, requestConfig)
    //     .then(async(response) => {
    //       console.log('response321',response)
    //       response
    //       .json()
    //       .then((responseJSon) =>{
    //         console.log('responseDataaa', dataToSend);
    //         console.log('responseJson', responseJSon);
    //       })
    //       .catch((errorr) =>{
    //         console.log('Response JSON error',errorr )
    //       })
    //     }
    //     )
    //     .catch((err) => {
    //       console.log('response err2', err);
    //       return err(_getErrorMessage(err));
    //     });
    // })
  // }

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
  const orderList = cartData.GeneralReducer
  
  return (
    <View style={styles.mainContainer}>
      {!!orderList && !!orderList.cart && orderList.cart.length > 0
      ?
      <FlatList 
      data={orderList.cart}
      contentContainerStyle={{ paddingBottom: 70 }}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        <OrderButton 
          title={'Checkout'} 
          onPress={() =>{
            // showToast("Order Place Successfully")
            const item = cartData.GeneralReducer.cart;
            _sendNotification()
            dispatch({type:actionTypes.CHECK_OUT,payload:''})
           
            setTimeout(() => {
            navigation.navigate('History')
          }, 1000);}} 
          mainContainerStyle={styles.checkOutBtn}
        />
      }
      />
      :
      <View style={styles.noDataView}>
        <Text>No Item Selected</Text>
      </View>
      } 
     
     </View>
  );
}

const mapStateToProps = (state) => {
  console.log('cartdataa',[state.GeneralReducer.cart])
  return {
    cart: state.GeneralReducer.cart,
    name:state.GeneralReducer.name,
    id:state.GeneralReducer.id,
    apcontrol: state.GeneralReducer.apcontrol,
    my_orders: state.GeneralReducer.my_orders,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getNotifications: (success, error) =>
//       dispatch(actions.getNotifications(success, error)),
//   };
// };
// export default Cart;

export default connect(mapStateToProps)(Cart);




<?php
include_once 'connection.php';

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

 $item_name  = $obj['name'];
 $shop_name  = $obj['shop'];
 $item_price = $obj['price'];
 $desc       = $obj['price'];
 $item_img   = $obj['price'];
 
 $CheckSQL = "SELECT * FROM orderList WHERE name='$item_name'";
 
 $check = mysqli_fetch_array(mysqli_query($conn,$CheckSQL));
 
  
if(isset($check)){
 
 $Duplicate_email = 'Email Already Exist, Please Try Again With Different Email.';
 
 $Duplicate_email_Json = json_encode($Duplicate_email);
 echo $Duplicate_email_Json ; 
 
 }

else {
        $query = "insert into orderList(id,name,shop,price,description,image) values (null,'$item_name','$shop_name',
        '$item_price','$desc','$item_img')";

if(mysqli_query($conn,$query)){
 
 $MSG = 'User Registered Successfully' ;
 
 $json = json_encode($MSG);
 
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
        
}

echo "insert data successfully";



 
 mysqli_close($conn);



?>




<?php
include_once 'connection.php';

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

print_r($obj);

    $item_name = "";
    $shop_name = "";
    $item_price = "";
    $desc = "";
    $item_img = "";
    
       if (isset($_GET["name"]) || isset($_GET["shop"]) || isset($_GET["price"]) || isset($_GET["description"]) || isset($_GET["image"]))
    {
         $item_name  = $_GET["name"];
         $shop_name  = $_GET["shop"];
         $item_price = $_GET["price"];
         $desc       = $_GET["description"];
         $item_img   = $_GET["image"];
    }  

 
 $CheckSQL = "SELECT * FROM orderList WHERE name='$item_name'";
 
 $check = mysqli_fetch_array(mysqli_query($conn,$CheckSQL));
 
  
if(isset($check)){
 
 $Duplicate_email = 'Email Already Exist, Please Try Again With Different Email.';
 
 $Duplicate_email_Json = json_encode($Duplicate_email);
 echo $Duplicate_email_Json ; 
 
 }

else {
        $query = "insert into orderList(name,shop,price,description,image) values ('$item_name','$shop_name',
        '$item_price','$desc','$item_img')";

if(mysqli_query($conn,$query)){
 
 $MSG = 'User Registered Successfully' ;
 
 $json = json_encode($MSG);
 
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
        
}

echo "insert data successfully";



 
 mysqli_close($conn);



?>
























import React,{useEffect,useState} from 'react';
import { View, Text,StyleSheet,Image,ScrollView,SafeAreaView,TouchableOpacity,FlatList,Alert } from 'react-native';
import { getStoredState } from 'redux-persist';
import { persistConfig } from '../../redux';
import { useDispatch,useSelector } from 'react-redux';
// import Components from '../../components';
import OrderCart from '../../components/Sections/OrderCard';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import actionTypes from '../../redux/actions/ActionTypes';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
// import config from '../../Api/Config';
// import axios from 'axios';
// import PushNotification from 'react-native-push-notification';
import { showToast } from '../../utils';
import OrderButton from '../../components/Buttons/OrderButton';
import messaging from '@react-native-firebase/messaging';
import notificationService from './notificationService';
import notifee,{AndroidStyle} from '@notifee/react-native'
import firestore from '@react-native-firebase/firestore'
import config from '../../Api/Config';
import { icons } from '../../assets/images';

function Cart(props) {

  // console.log('checkDate',{setDate,setTime})
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const cartData = useSelector(state=>state)
  useEffect(()=>{
    getFCMToken()
    if( requestUserPermission()){
      messaging().getToken().then(token => {
        console.log('chekcctokennrequest: ',token)
      })
    }
    else
    {
      console.log('failedTokenGet',authStatus)
    }
    messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage',JSON.stringify(remoteMessage))
    })
    DisplayNotification(remoteMessage)
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
  // const getFCMToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log("token=>>>",token);
  //   } catch (e) {
      // console.log("token=>>>error",error);
  //   }
  // };
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enable = 
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if(enable)
    {
      console.log('AuthhStatusss',authStatus)
    }
  }
  async function DisplayNotification(remoteMessage) {
    // const channelId = await notifee.createChannel({
    //   id:'default',
    //   name:'Default Channel'
    // })
    await notifee.displayNotification({
      title:remoteMessage.notification.title,
      // body: remoteMessage.notification.body,
      android: {
        // channelId,
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

// const getAllTokens = () => {
//   let TempTokens = [];
//   firestore()
//   .collection('userToken')
//   .get().then(querySnapShot=>{
//     querySnapShot.forEach(documentSnapShot => {
//       sendSingleDeviceNotification(documentSnapShot.data().token)
//     })
//     console.log('userDeviceToken',TempTokens)
//     sendSingleDeviceNotification(TempTokens)
//     })
// }




  const _sendNotification = async (props) => {
    // console.log('checkdetail',props)
    // const setDate = new Date().toLocaleDateString()
    // const setTime = new Date().toLocaleTimeString()
    const orderDetail = {
      userName:props.props.name,
      userId:props.props.id,
      userOrder:props.item,
      date:new Date().toLocaleDateString(),
      time:new Date().toLocaleTimeString()
      }
      console.log("firestoreOrders",orderDetail)
      firestore().collection('orderList').add({
     
          orderDetail:orderDetail,
        
      })
    
    // else
    // {
    //   getStoredState(persistConfig).then((_state) => {
    //     console.log('checkstate',_state)
    //     let url = config.ReportUrl + 'notificationApi.php'
      
    //     let headers = {
    //       'Accept'       : 'application/json',
    //       'Content-Type' : 'application/json',
    //     };
      
    //     console.log('notificationUrl', url, '  ', _state);
    //     let dataToSend = JSON.stringify(userOrderList);
      
    //     console.log('dataToSend',dataToSend)
    //     let requestConfig = {
    //       method: 'POST',
    //       headers: new Headers(headers),
    //       body:  dataToSend,
    //     };
      
    //     // console.log('urllrepsoon', url);
    //     // console.log('requestConfig', requestConfig);
    //     fetch(url, requestConfig)
    //     //  .then(response=>{ return JSON.parse(response) }).then(data=>{ alert(data);})
    //       .then((response) => {
      
    //         console.log('mynotificationResponse111',response)
    //         response
    //         .text()
    //         .then((responseJSon) =>{
      
    //           console.log('mynotificationResponse222', response);
    //           console.log('mynotificationResponse333', responseJSon);
    //         })
    //         .catch((errorr) =>{
    //           console.log('mynotificationResponse444',errorr )
    //         })
    //       })
    //       .catch((err) => {
    //         console.log('responseerr2', err);
    //         return error(_getErrorMessage(err));
    //       });
    //   });
    // }
    

   
    
    
    firestore().collection('userToken').get().then(querySnap=>{
     querySnap.docs.map(async docSnap=>{
       const adminTokens =  docSnap.data().token
       var userName    = props.props.name
       // var apLevel     = props.props.apcontrol
       // var userId      = props.props.id
       // console.log('userDetails',[userName,apLevel,userId])
       var ProductName = props.item
       
       let Title  = "Foods: ";
       let Body   = "Person Name: " + userName + '<br \/>';
       
       ProductName.forEach(element => {
         Title = Title + element.name + ", ";
         Body  = Body  + "Food: " + element.name + ", Quantity: " + element.QTY + '<br \/>' + "Notes: " + element.notes + '<br \/>';
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
  
  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backArrow}
          activeOpacity={.8}
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
      <FlatList 
      data={orderList.cart}
      contentContainerStyle={{ paddingBottom: 70 }}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        <OrderButton 
          title={'Checkout'} 
          onPress={() =>{
            // showToast("Order Place Successfully")
            const item = cartData.GeneralReducer.cart;
            _sendNotification({props,item})
            dispatch({type:actionTypes.CHECK_OUT,payload:''})
           
            setTimeout(() => {
            navigation.navigate('History')
          }, 1000);
        }} 
          mainContainerStyle={styles.checkOutBtn}
        />
      }
      />
      :
      <View style={styles.noDataView}>
        <Text>No Item Selected</Text>
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