import React, { useEffect,useState } from 'react';
import { View, Text,Image,ScrollView,SafeAreaView, TouchableOpacity,Button } from 'react-native';
import styles from './styles'
import Components from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import actionTypes from '../../redux/actions/ActionTypes';
import MainInput from '../../components/Input/MainInput';
import { showToast } from '../../utils';
import { connect } from 'react-redux';
import { icons } from '../../assets/images';
import OrderButton from '../../components/Buttons/OrderButton';
import QuantityButton from '../../components/Buttons/QuantityButton';
import { TextInput } from 'react-native-gesture-handler';
function ProductDetails(props) {
  // console.log('checkkkingggg',props)
  let [QTY, setNum]= useState(1);
  let incNum =()=>{
    if(QTY<99)
    {
    setNum(Number(QTY)+1);
    }
  };
  let decNum = () => {
     if(QTY>1)
     {
      setNum(QTY - 1);
     }
  }
 let handleChange = (e)=>{
   setNum(e.target.value);
  }
    const navigation = useNavigation();
    const ProductImage = props.route.params.foodList.image;
    const ProductName = props.route.params.foodList.name;
    const ProductPrice = props.route.params.foodList.price;
    const ProductDetail = props.route.params.foodList.shop;
    
    const [notes, setNotes] = useState("");
    // const [QTY, setQty] = useState("");

    const data = props.route.params.foodList;
    const dispatch = useDispatch()
    useEffect(()=>{
        // console.log('PRODUCTDETAIL',data)
      },[])
    const addToCart = (props) => {
      setNotes('')
      setNum('1')
      // const ItemId = props.cartDetail
      // console.log('addItemId', ItemId);

        const current = new Date();
        const currentHour = current.getHours();
        if( currentHour >= 9 && currentHour <=23 ){
          dispatch({type:actionTypes.ADD_TO_CART,payload:data,notes,QTY})
          // console.log('notessfindding',data)
          setTimeout(()=>{
            navigation.navigate('OurProudct')
          },1000)
        }
        else{
          return showToast("You can't place order right now");
        }
       
      }

      const OrderRn = (props) => {
        setNotes('')
        setNum('1')
          const current = new Date();
          const currentHour = current.getHours();
          if( currentHour >= 9 && currentHour <=23 ){
            dispatch({type:actionTypes.ADD_TO_CART,payload:data,notes,QTY})
            setTimeout(()=>{
              navigation.navigate('MenuScreen')
            },1000)
          }
          else{
            return showToast("You can't place order right now");
          }
        }
    return (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backArrow}
          activeOpacity={.8}
          onPress={()=>{
          navigation.navigate('OurProudct',{
            all_product_list:props.all_product_list.item
          })
        }}
        >
        <Image source={icons.previous} style={styles.backArrowSize}/>
        </TouchableOpacity>
    <ScrollView>
      <Image source={{uri:ProductImage}} style={styles.TopImage} resizeMode='cover'/>
    
      <View style={styles.contentContainer}>
        {/* <Text style={styles.name}></Text> */}
        <Text style={styles.otherDetail}>{ProductName}</Text>
        <Text style={styles.otherDetail}>Price :<Text style={styles.ProductDetail}>{ProductPrice}</Text></Text>
        <Text style={styles.otherDetail}>Shop: <Text style={styles.ProductDetail}>{ProductDetail}</Text></Text>
        <View style={styles.qtyContainer}>
        <Text style={styles.otherDetail}>Quantity:</Text>
        <QuantityButton title="-"  onPress={decNum} mainContainerStyle={styles.incrementBtn}/>
        <Text onChangeText={handleChange} style={styles.qtyText}>{QTY}</Text>
        <QuantityButton title="+"onPress={incNum} mainContainerStyle={styles.decrementBtn}/>
       
        </View>

        
        
        {/* <MainInput
            placeholder="Quantity"
            style={styles.Qtyfield}
            value={QTY}
            onChangeText={handleChange}
            keyboardType={'numeric'}
          /> */}
        {/* <Text style={styles.otherDetail}>Notes:</Text> */}
        <TextInput
           placeholder="More Detail"
           style={styles.moreDetail}
           value={notes}
           onChangeText={(text) => setNotes(text)}
        
        />
      </View>
      <OrderButton title={'Add To Cart'} mainContainerStyle={styles.addToCartBtn} onPress={()=>addToCart(props)}/>
      <OrderButton title={'Order Now'} mainContainerStyle={styles.orderNowBtn} onPress={()=>OrderRn(props)}/>
        {/* <Components.AppButton title={'Add To Cart'} mainContainerStyle={styles.checkOutBtn} onPress={()=>addToCart(props)}/> */}
     </ScrollView>
     </View>
  );
}
const mapState = (state) => {
  return {
      apcontrol:  state.GeneralReducer.apcontrol,
      name:       state.GeneralReducer.name,
      id:         state.GeneralReducer.id,
      cartDetail: state.GeneralReducer.cart,
      all_product_list:state.GeneralReducer.all_product_list
  };
};
const mapProps = (dispatch) => {
  return {};
};
export default connect(mapState, mapProps)(ProductDetails);