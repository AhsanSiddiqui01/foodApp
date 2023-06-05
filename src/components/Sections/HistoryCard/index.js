import React,{useState} from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { icons } from '../../../assets/images';

function HistoryCart (props) {
  console.log('userOrderDDSS',props)
   
  const {item,onPress,data} = props
  console.log('checkkdataaa',item)
    const randomColor = () => {
        const red   = Math.floor(Math.random() * 230)
        const blue  = Math.floor(Math.random() * 200)
        const green = Math.floor(Math.random() * 150)
        return `rgb(${red},${green},${blue})`
    }
    // const unameOrders = item.userName
    const displayDate    = item.date
    const displayTIme    = item.time
    const TotalAmount    = item.totalPrice
    const fireStoreUid   = item.userId
    const checkID        = props.id
    // console.log('userIddd',displayTIme)
    
    // const coldDrink = data.drinks
    // const orderDrinks = coldDrink.map((items)=>{
    //   return( 

    //       <View key={items.id}>
    //         <Text style={styles.drinksandNotes}>Drinks:
    //       {items.drink1.quantity == '0' ? null : <Text>{items.drink1.name} ({items.drink1.quantity}) </Text>}
    //       {items.drink2.quantity == '0' ? null : <Text>{items.drink2.name} ({items.drink2.quantity}) </Text>}
    //       {items.drink3.quantity == '0' ? null : <Text>{items.drink3.name} ({items.drink3.quantity}) </Text>}
    //       {items.drink4.quantity == '0' ? null : <Text>{items.drink4.name} ({items.drink4.quantity}) </Text>}
          
    //       {items.drink1.quantity == '0' && items.drink2.quantity == '0' &&
    //        items.drink3.quantity == '0' && items.drink4.quantity == '0'
    //        ? <Text> No Drinks</Text> : null}
    //       </Text>
    //       </View>
    //     )
     
    // });

  return (
    <View>
      {checkID == fireStoreUid && (item.userOrder) 
      ?
      <View style={[styles.orderByContainer]}>
                <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                  <Text style={styles.orderTexttextField}>Date:   {displayDate}</Text>
                  <Text style={styles.orderTexttextField}>Time:   {displayTIme}</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                <Text style={{color:'white'}}>Sub Total: {TotalAmount} Rs</Text>
                </View>
            </View>
      :
      <></>
      }
        {checkID == fireStoreUid  && (item.userOrder)  
      ? 
        item.userOrder.map((item)=>
        <View 
        style={styles.container}
        >
     <View 
    style={styles.card}
    >
        <View style={styles.productImageView}>
         <Image
          resizeMode='cover'
          style={styles.imgContainer}
          source={{uri: item.image}}
        />
        </View>
        <View >
        <Text style={styles.name}>{item.name} ({item.price})</Text>
        {item.QTY != '' ? 
        <Text style={styles.name}>QTY: {item.QTY}</Text>
        :
        <Text style={styles.name}>QTY: 1</Text>
        }
     
        <Text style={styles.name}>Total: {item.itemPrice}</Text>
  
        </View> 
        </View>
        <View style={styles.drinksandNotesContainer}>
        {
            item.drink1.quantity == 0 && item.drink2.quantity == 0 && item.drink3.quantity == 0 && item.drink4.quantity == 0 ? 
            <Text style={styles.drinksandNotes}>Drinks: No Drinks
            </Text>
            :
            <View>
            <Text style={styles.drinksandNotes}>Drinks: 
             {item.drink1.name}({item.drink1.quantity}) <></>
             {item.drink2.name}({item.drink2.quantity}) <></>
             {item.drink3.name}({item.drink3.quantity}) <></>
             {item.drink4.name}({item.drink4.quantity}) ({item.drink1.totalDrinkPrice})<></>
            </Text>
            </View>
            }
             {
          item.notes != ''?
          <Text style={styles.drinksandNotes} numberOfLines={1}>Notes: {item.notes}</Text>
          :
          <Text style={styles.drinksandNotes}>Notes: No note</Text>
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
        </View>
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

