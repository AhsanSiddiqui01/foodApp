import actionTypes from './ActionTypes';
import Api from '../../Api/index';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { isStaff } from '../../utils/roles';
import { ACCOUNT_SUSPENDED, ACCOUNT_REMOVED } from '../../utils/userAdmin';

const _authErrorMessage = (code) => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    // These two only arrive when "Email enumeration protection" is turned off in the console
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    // With the protection on (Firebase default) a wrong email and a wrong password look the same
    case 'auth/invalid-login':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/too-many-requests':
      return 'Too many attempts, please try again later';
    case 'auth/network-request-failed':
      return 'No internet connection';
    default:
      return 'Login failed, please try again';
  }
};

const actions = {
  //login with Firebase Auth; role (apcontrol) comes from userProfiles/{uid}
  login: (credentials, success, error) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.START_LOADING });
      try {
        const { user } = await auth().signInWithEmailAndPassword(
          credentials.email.trim(),
          credentials.password,
        );
        const profile = await firestore().collection('userProfiles').doc(user.uid).get();
        // Removed or blocked accounts are signed straight back out; the login screen shows
        // these as a dialog (an object) rather than a toast (a string)
        const removed = !profile.exists || profile.data().deleted;
        if (removed || profile.data().blocked) {
          await auth().signOut();
          dispatch({ type: actionTypes.CLOSE_LOADING });
          return error(removed ? ACCOUNT_REMOVED : ACCOUNT_SUSPENDED);
        }
        const { name, apcontrol } = profile.data();
        dispatch({
          type: actionTypes.USER_INFO,
          payload: {
            access_token: user.uid,
            apcontrol: Number(apcontrol),
            name: name,
            id: user.uid,
          },
        });
        dispatch({ type: actionTypes.CLOSE_LOADING });
        return success({
          mess: 'Login Successfull',
          apcontrol: Number(apcontrol),
          name: name,
          id: user.uid,
        });
      } catch (e) {
        console.log('login error', e);
        dispatch({ type: actionTypes.CLOSE_LOADING });
        return error(_authErrorMessage(e.code));
      }
    };
  },

  //logout
  logOut: (success, error) => {
    return async (dispatch, getState) => {
      dispatch({ type: actionTypes.START_LOADING });
      // Stop new-order alerts on this device once the admin signs out (must run while still signed in)
      if (isStaff(getState().GeneralReducer.apcontrol)) {
        try {
          const token = await messaging().getToken();
          await firestore().collection('adminToken').doc(token).delete();
        } catch (e) {
          console.log('admin token remove error', e);
        }
      }
      try {
        if (auth().currentUser) {
          await auth().signOut();
        }
      } catch (e) {
        console.log('logout error', e);
      }
      dispatch({ type: actionTypes.LOG_OUT });
      dispatch({ type: actionTypes.CLOSE_LOADING });
      return success(true)
    };
  },


  // getProductLists: (completed, failed) => {
  //   console.log('right action callked')
  //   return (dispatch) => {
  //     dispatch({ type: actionTypes.START_LOADING });
  //     Api.get(
  //       'Data.php',
  //       console.log('right action callkedssss'),
  //       (success) => {
  //         console.log('getEmployeeProfiles Success :', success);

  //         dispatch({
  //           type: actionTypes.PRODUCT_LIST,
  //           payload: success.employeeD,
  //         });
  //         dispatch({ type: actionTypes.CLOSE_LOADING });
  //         // return completed(true);
  //       },
  //       (error) => {
  //         console.log('getEmployeeProfiles error :', success);
  //         dispatch({ type: actionTypes.CLOSE_LOADING });
  //         return failed(error?.message);
  //       },
  //     );
  //   };
  // },
  

  //get product list data from Firestore foodList; search by name like the old PHP LIKE query
  getProductLists: (keyword) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.START_LOADING });
      try {
        const snapshot = await firestore().collection('foodList').get();
        const search = (keyword || '').trim().toLowerCase();
        const foodList = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => (item.name || '').toLowerCase().includes(search));
        dispatch({
          type: actionTypes.PRODUCT_LIST,
          payload: foodList,
        });
      } catch (e) {
        console.log('ProductList error', e);
      }
      dispatch({ type: actionTypes.CLOSE_LOADING });
    };
  },

   //get product detail
  //  getProductDetail: () => {
  //   return (dispatch) => {
  //     dispatch({ type: actionTypes.START_LOADING });
  //     Api.get(
  //       'Data.php',
  //       (success) => {
  //         console.log('carrtttttttt', success)
  //         dispatch({
  //           type: actionTypes.CHECK_OUT,
  //           payload: success.cart,
  //         });

  //         dispatch({ type: actionTypes.CLOSE_LOADING });
  //       },
  //       (error) => {
  //         dispatch({ type: actionTypes.CLOSE_LOADING });
  //       },
  //     );
  //   };
  // },


  getNotifications: (completed, failed) => {
    console.log('getnotification',completed)
    return (dispatch) => {
      console.log('getnotiffce',completed)
      // dispatch({type: 'START_LOAD'});
      Api.post(
        'notificationApi.php',
        (success) => {
          console.log('getNotificationsSuccess :', success);
          if (success.code == 'error') {
            return failed(error?.message);
          } else {
            dispatch({
              type: actionTypes.GET_NOTIFICATION,
              payload: success,
            });

            return completed(true);
          }
        },
        (error) => {
          console.log('getNotifications error :', success);
          // dispatch({type: 'CLOSE_LOAD'});
          return failed(error?.message);
        },
      );
    };
  },

};

export default actions;
