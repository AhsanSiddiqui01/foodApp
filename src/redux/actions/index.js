import actionTypes from './ActionTypes';
import Api from '../../Api/index';
const actions = {
  login: (credentials, success, error) => {
    console.log('credentials login', credentials);
    return (dispatch) => {
      dispatch({ type: actionTypes.START_LOADING });
      Api.loginPost(
        'login.php',
        credentials,
        (apiSuccess) => {
          console.log('apiSuccess login', apiSuccess);
          dispatch({
            type: actionTypes.USER_INFO,
            payload: {
              access_token: apiSuccess.session_id,
              password: apiSuccess.password,
              apcontrol: apiSuccess.apcontrol,
              name:apiSuccess.name,
              id:apiSuccess.id,
            },
          });
          dispatch({ type: actionTypes.CLOSE_LOADING });
          return success(apiSuccess)},
        (apiError) => {
          console.log('apiError logiun', apiError);
          dispatch({ type: actionTypes.CLOSE_LOADING });
          return error(apiError);
        },
      );
    };
  },

  //logout
  logOut: (success, error) => {
    return (dispatch) => {
      dispatch({ type: actionTypes.START_LOADING });

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
  

  //get product list data
  getProductLists: (keyword) => {
    return (dispatch) => {
      dispatch({ type: actionTypes.START_LOADING });
      Api.get(
        `foodList.php/?name=${keyword}`,
        (success) => {
          // console.log('productList SUCCESSSS', success)
          dispatch({
            type: actionTypes.PRODUCT_LIST,
            payload: success.foodList,
          });

          dispatch({ type: actionTypes.CLOSE_LOADING });
        },
        (error) => {
          // console.log('ProductList error', error)
          dispatch({ type: actionTypes.CLOSE_LOADING });
        },
      );
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
