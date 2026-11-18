
import Toast from 'react-native-simple-toast'

export const showToast = message => {
    if (Platform.OS == 'android') {
      return Toast.show(message);
    } else {
      return setTimeout(() => Toast.show(message), 300);
    }
  };

  // Orders are accepted from ORDER_START_HOUR:00 until ORDER_END_HOUR:00 (device local time)
  export const ORDER_START_HOUR = 9;
  export const ORDER_END_HOUR = 17;
  export const ORDER_TIME_TEXT = '9:00 AM TO 05:00 PM';
  export const isOrderTimeOpen = (date = new Date()) => {
    const hour = date.getHours();
    return hour >= ORDER_START_HOUR && hour < ORDER_END_HOUR;
  };

  export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;