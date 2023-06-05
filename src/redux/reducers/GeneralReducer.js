import actionTypes from './../actions/ActionTypes';

const INITIAL_STATE = {
  userInfo: null,
  loading: false, //done
  activity_loading: false, //done
  access_token: null, //done
  session_id: null,
  password: null,
  apcontrol: null,
  all_product_list:[],
  sub_item_list:[],
  product_detail:'',
  get_notification:[],
  searchedProperties: [],
  userNotifications: [],
  userStreamsData: [],
  id: null,
  cart:[],
  my_orders:[],
};

export default GeneralReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

//login
  case actionTypes.USER_INFO: {
    return {
      ...state,
      ...(action.payload.access_token != undefined
        ? {
          access_token: action.payload.access_token,
          password: action.payload.password,
          apcontrol: action.payload.apcontrol,
          name:action.payload.name,
          id:action.payload.id,
        }
        : undefined),
      loading: false,
    };
  }

//logout
   case actionTypes.LOG_OUT: {
    return {
      ...INITIAL_STATE,
      access_token: null,
      password:null,
      apcontrol:null,
      name:null,
      id:null,

    };
  }

//getting Product List
 case actionTypes.PRODUCT_LIST: {

  return {
    ...state,
    all_product_list: action.payload
  };
} 
//getting Sub List
case actionTypes.SUB_LIST: {

  return {
    ...state,
    sub_item_list: action.payload
  };
} 
//getting Product Detail
 case actionTypes.PRODUCT_DETAIL: {

  return {
    ...state,
    ...USER_INFO,
    product_detail: action.payload
  };
}
//getting Notifications
case actionTypes.GET_NOTIFICATION: {

  return {
    ...state,
    get_notification: action.payload
  };
}
//add to cart
case actionTypes.ADD_TO_CART:
  const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
  return{
    ...state,
    cart: inCart
      ? state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, itemPrice:action.itemPrice,totalPrice:action.totalPrice,QTY: action.QTY, notes:action.notes,drink1:action.drink1,drink2:action.drink2,drink3:action.drink3,drink4:action.drink4 }
            : item,
        )
      : [...state.cart, { ...action.payload,itemPrice:action.itemPrice,totalPrice:action.totalPrice, QTY: action.QTY, notes:action.notes,drink1:action.drink1,drink2:action.drink2,drink3:action.drink3,drink4:action.drink4 }],

      // ...state,
      // cart:[
      //     ...state.cart,
      //     {
      //         ...action.payload,
      //         QTY:action.QTY,
      //         notes:action.notes
      //     }
      // ],
      
  }

//checkout list
case actionTypes.CHECK_OUT:
    return{
        ...state,
        apcontrol: action.payload.apcontrol,
        my_orders:[
            ...state.cart,
            ...state.my_orders
        ],
        cart:[]
    }
    case actionTypes.START_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionTypes.START_ACTIVITY_LOADING: {
      return {
        ...state,
        activity_loading: true,
      };
    }
    case actionTypes.CLOSE_ACTIVITY_LOADING: {
      return {
        ...state,
        activity_loading: false,
      };
    }

    case actionTypes.CLOSE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

  
    //Login saving access token
    case actionTypes.USER_INFO_Access_token: {
      return {
        ...state,
        ...(action.payload.access_token != undefined
          ? { access_token: action.payload.access_token }
          : undefined),
        loading: false,
      };
    }

    //Signup saving access token
    case actionTypes.USER_INFO_Access_token_signup: {
      return {
        ...state,
        ...(action.payload.access_token_signup != undefined
          ? { access_token_signup: action.payload.access_token_signup }
          : undefined),
        loading: false,
      };
    }

 

    //update profile
    case actionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
    }





    //SearchedProperties
    case actionTypes.SEARCHED_PRODUCTS: {
      return {
        ...state,
        loading: false,
        // searchedProperties: action.payload,
      };
    }

    case actionTypes.GET_NOTIFICATION: {
      return {
        ...state,
        userNotifications: action.payload,
      };
    }



    default:
      return state;
  }
};
