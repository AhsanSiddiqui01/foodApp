
import { Platform } from 'react-native'
import Toast from 'react-native-simple-toast'
import { now } from './serverTime'
import { isOpenNow } from './serviceSettings'

export const showToast = message => {
    if (Platform.OS == 'android') {
      return Toast.show(message);
    } else {
      return setTimeout(() => Toast.show(message), 300);
    }
  };

  // Ordering hours come from the owner's Settings tab (see serviceSettings.js), checked against
  // the server-corrected clock in each user's own time zone
  export const isOrderTimeOpen = (date = now()) => isOpenNow(date);

  export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;