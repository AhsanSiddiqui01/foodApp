import React,{useState} from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { icons } from '../../../assets/images';

function HistoryCart (props) {
  console.log('userOrderDDSS')
   
  const {item,onPress} = props
  // console.log('checkkdataaa',item)
    const randomColor = () => {
        const red   = Math.floor(Math.random() * 230)
        const blue  = Math.floor(Math.random() * 200)
        const green = Math.floor(Math.random() * 150)
        return `rgb(${red},${green},${blue})`
    }
    // const unameOrders = item.userName
    const displayDate    = item.date
    const displayTIme    = item.time
    const fireStoreUid   = item.userId
    const checkID        = props.id
    // console.log('userIddd',displayTIme)
  return (
    <View>
      {checkID == fireStoreUid && (item.userOrder) 
      ?
      <View style={[styles.orderByContainer]}>
                <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                  <Text style={styles.orderTexttextField}>Date:   {displayDate}</Text>
                  <Text style={styles.orderTexttextField}>Time:   {displayTIme}</Text>
                </View>
            </View>
      :
      <></>
      }
        {checkID == fireStoreUid  && (item.userOrder)  
      ? 
        item.userOrder.map((item)=>
        <TouchableOpacity 
        style={[styles.mainContainer,{backgroundColor: randomColor()}]}
        // style={styles.mainContainer}
        activeOpacity={1}
        >
        <View style={styles.productImageView}>
         <Image
          resizeMode='cover'
          style={styles.imgContainer}
          source={{uri: item.image}}
        />
        </View>
        <View >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>Price: {item.price}</Text>
        {item.QTY != '' ? 
        <Text style={styles.name}>QTY: {item.QTY}</Text>
        :
        <Text style={styles.name}>QTY: 1</Text>
        }
        {
          item.notes != ''?
          <Text style={styles.name} numberOfLines={1}>Notes: {item.notes}</Text>
          :
          <Text style={styles.name}>Notes: No note</Text>
        }
        
        </View> 
        {/* <TouchableOpacity onPress={onPress}>
          <Image
          source={require('../../../assets/images/icons/remove.png')}
          style={{width:35,height:35,marginLeft:68}}
          />
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={onPress}>
            {
              item.name ?  <Image
              source={icons.checKActive}
              style={{width:35,height:35,marginLeft:68}}
              />
              :
              <Image
              source={icons.checkInactive}
              style={{width:35,height:35,marginLeft:68}}
              />
            }
        
          </TouchableOpacity> */}
        </TouchableOpacity>
        )
        : 
        <></>
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

export default connect(mapStateToProps,mapDispatchToProps)(HistoryCart);

