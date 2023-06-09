import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken()
  }
}

async function GetFCMToken () {
let fcmToken = await AsyncStorage.getItem("fcmtoken")
console.log(fcmToken,"old token")
if(!fcmToken){
    try {
        const  fcmToken=messaging().getToken()
        if(fcmToken){
            console.log(fcmToken,"new token")
        await AsyncStorage.setItem("fcmtoken",fcmToken)
        }
        else{
            
        }
    } catch (error){
        console.log(error,"error in fcmtoken")
    }
  
}
}
export const NotificationListner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
       // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
    messaging().onMessage(async remoteMessage =>{
        console.log("notification on forground state......",remoteMessage)
    })
}