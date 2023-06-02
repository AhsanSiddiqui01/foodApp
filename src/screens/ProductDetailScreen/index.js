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
import { CommonActions } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import ThemeColors from '../../utils/ThemeColors';

function ProductDetails(props) {
  // console.log('checkkkingggg',props)
  let [QTY, setNum]= useState(1);
  let [price,setPrice] = useState()
  
  //CHAT CODE
  const [total, setTotal] = useState(0);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox1Value, setCheckbox1Value]     = useState(0);

const [checkbox2Checked, setCheckbox2Checked] = useState(false);
const [checkbox2Value, setCheckbox2Value]     = useState(0);

const [checkbox3Checked, setCheckbox3Checked] = useState(false);
const [checkbox3Value, setCheckbox3Value]     = useState(0);

const [checkbox4Checked, setCheckbox4Checked] = useState(false);
const [checkbox4Value, setCheckbox4Value]     = useState(0);

const [drink1,setDrink1] = useState()
const [drink2,setDrink2] = useState()
const [drink3,setDrink3] = useState()
const [drink4,setDrink4] = useState()

const handleCheckbox1Change = (value) => {
  if(value == true)
  {
    setCheckbox1Checked(value);
    const drink1 = setCheckbox1Checked && <Text>PEPSI</Text>
    setDrink1(drink1.props.children)
  }
  else
  {
    setCheckbox1Checked(value);
    setDrink1('');
  }

};

const handleCheckbox2Change = (value) => {
  if(value == true)
  {
    setCheckbox2Checked(value);
    const drink2 = setCheckbox2Checked && <Text>7UP</Text>
    setDrink2(drink2.props.children)
  }
  else 
  {
    setCheckbox2Checked(value);
    setDrink2('');
  }

};
const handleCheckbox3Change = (value) => {
  if(value == true)
  {
    setCheckbox3Checked(value);
    const drink3 = setCheckbox3Checked && <Text>FANTA</Text>
    setDrink3(drink3.props.children)
  }
  else 
  {
    setCheckbox3Checked(value);
    setDrink3('');
  }
  
};
const handleCheckbox4Change = (value) => {
  if(value == true)
  {
    setCheckbox4Checked(value);
    const drink4 = setCheckbox4Checked && <Text>DEW</Text>
    setDrink4(drink4.props.children)
  }
  else 
  {
    setCheckbox4Checked(value);
    setDrink4('');
  }
  
};
  
// console.log(DrinkNames)
const handleCheckbox1Increment = () => {
  setCheckbox1Value(checkbox1Value + 1);
};

const handleCheckbox1Decrement = () => {
  if (checkbox1Value > 0) {
    setCheckbox1Value(checkbox1Value - 1);
  }
};

const handleCheckbox2Increment = () => {
  setCheckbox2Value(checkbox2Value + 1);
};

const handleCheckbox2Decrement = () => {
  if (checkbox2Value > 0) {
    setCheckbox2Value(checkbox2Value - 1);
  }
};

const handleCheckbox3Increment = () => {
  setCheckbox3Value(checkbox3Value + 1);
};

const handleCheckbox3Decrement = () => {
  if (checkbox3Value > 0) {
    setCheckbox3Value(checkbox3Value - 1);
  }
};

const handleCheckbox4Increment = () => {
  setCheckbox4Value(checkbox4Value + 1);
};

const handleCheckbox4Decrement = () => {
  if (checkbox4Value > 0) {
    setCheckbox4Value(checkbox4Value - 1);
  }
};

useEffect(() => {
  let newTotal = 0;
  if (checkbox1Checked) {
    newTotal += checkbox1Value;
  }
  if (checkbox2Checked) {
    newTotal += checkbox2Value;
  }
  if (checkbox3Checked) {
    newTotal += checkbox3Value;
  }
  if (checkbox4Checked) {
    newTotal += checkbox4Value;
  }
  setTotal(newTotal);
}, [checkbox1Checked, checkbox1Value, checkbox2Checked, checkbox2Value
   , checkbox3Checked, checkbox3Value, checkbox4Checked, checkbox4Value]);
  //CHAT CODE

  let incNum =()=>{
    if(QTY<99)
    {
    setNum(Number(QTY)+1);
    setPrice(ProductPrice * QTY)
    }
  };
  let decNum = () => {
     if(QTY>1)
     {
      setNum(QTY - 1);
      console.log('checkprice',price)
      setPrice(price - ProductPrice)
     }
  }
 let handleChange = (e)=>{
   setNum(e.target.value);
   setPrice(e.target.value)
  }



    const navigation = useNavigation();
    const ProductImage = props.route.params.foodList.image;
    const ProductName = props.route.params.foodList.name;
    const ProductPrice = props.route.params.foodList.price;
    const ProductDetail = props.route.params.foodList.shop;
    const DrinkPrices    = props.route.params.foodList.drinkprice;
    const [notes, setNotes] = useState("");
    // const [QTY, setQty] = useState("");

    const data = props.route.params.foodList;
    const dispatch = useDispatch()
   
    const addToCart = (props) => {
      const drink1 = {name:'PEPSI',quantity:checkbox1Value}
      const drink2 = {name:'7UP',quantity:checkbox2Value}
      const drink3 = {name:'FANTA',quantity:checkbox3Value}
      const drink4 = {name:'DEW',quantity:checkbox4Value}
      console.log('drink1',drink1)
      setNotes('')
      setNum('1')
      setPrice()
      // const ItemId = props.cartDetail
      // console.log('addItemId', ItemId);

        const current = new Date();
        const currentHour = current.getHours();
        if( currentHour >= 9 && currentHour <=23 ){
          dispatch({type:actionTypes.ADD_TO_CART,payload:data,price:ProductPrice * QTY + + DrinkPrices * total,notes,QTY,drink1,drink2,drink3,drink4})
          console.log('notessfindding',data)
          setTimeout(()=>{
            navigation.navigate('OurProudct')
          },1000)
        }
        else{
          return showToast("You can't place order right now");
        }
       
      }

      const OrderRn = (props) => {
        const drink1 = {name:'PEPSI',quantity:checkbox1Value}
        const drink2 = {name:'7UP',quantity:checkbox2Value}
        const drink3 = {name:'FANTA',quantity:checkbox3Value}
        const drink4 = {name:'DEW',quantity:checkbox4Value}
        console.log('checkcccdcc',props)
        setNotes('')
        setNum('1')
        setPrice()
          const current = new Date();
          const currentHour = current.getHours();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'OurProudct' },
              ],
            })
          );
          if( currentHour >= 9 && currentHour <=23 ){
            dispatch({type:actionTypes.ADD_TO_CART,payload:data,price:ProductPrice * QTY + + DrinkPrices * total,notes,QTY,drink1,drink2,drink3,drink4})
         
            setTimeout(()=>{
              navigation.navigate('MenuScreen')
            },)
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
     
       
        
   
        <Text style={styles.otherDetail}>Shop: <Text style={styles.ProductDetail}>{ProductDetail}</Text></Text>
        <View style={styles.qtyContainer}>
        <Text style={styles.otherDetail}>Quantity:</Text>
        <QuantityButton title="-"  onPress={decNum} mainContainerStyle={styles.incrementBtn}/>
        <Text onChangeText={handleChange} style={styles.qtyText}>{QTY}</Text>
        <QuantityButton title="+"onPress={incNum} mainContainerStyle={styles.decrementBtn}/>
        <Text onChangeText={handleChange}  style={styles.priceTotal}>Price :
      
        <Text style={styles.ProductDetail}>
        {(() => {
              if (checkbox1Checked == true){
                  return (
                      <Text>{ProductPrice * QTY + + DrinkPrices * total }</Text>
                  )
              }
              else if (checkbox2Checked == true){
                return (
                    <Text>{ProductPrice * QTY + + DrinkPrices * total }</Text>
                )
            } 
            else if (checkbox3Checked == true){
              return (
                  <Text>{ProductPrice * QTY + + DrinkPrices * total }</Text>
              )
          } 
          else if (checkbox4Checked == true){
            return (
                <Text>{ProductPrice * QTY + + DrinkPrices * total }</Text>
            )
        } 
              return  ProductPrice * QTY;
            })()}</Text>
        
        </Text>
            {/* <Text>{DrinkPrices * total}</Text> */}
        </View>
        <View style={styles.drinkMainContainer}>

        <View style={styles.drinkContainer}>
        <View style={styles.checkBox}>
        <CheckBox
        tintColors={{ true: ThemeColors.darkBlue, false: '' }}
        disabled={false}
        value={checkbox1Checked}
        onValueChange={(newValue) => handleCheckbox1Change(newValue)}
        />
        </View>
        <View style={styles.drinkName}>
        <Text style={{fontSize:16}}>PEPSI - {DrinkPrices} Rs </Text>
        </View>
        <View style={styles.drinkQuantity}>
        { checkbox1Checked == true ?
          <QuantityButton title="-" onPress={handleCheckbox1Decrement} mainContainerStyle={styles.incrementBtn} disabled={false}/>
        :
        <QuantityButton title="-"  onPress={handleCheckbox1Decrement} mainContainerStyle={styles.incrementBtn} disabled={true}/>
        }
        <Text style={styles.qtyText}>{checkbox1Checked == true ? checkbox1Value : '0'}</Text>
        {checkbox1Checked == true ?
        <QuantityButton title="+"onPress={handleCheckbox1Increment} mainContainerStyle={styles.decrementBtn} disabled={false}/>
        :
        <QuantityButton title="+"onPress={handleCheckbox1Increment} mainContainerStyle={styles.decrementBtn} disabled={true}/>
        }
        </View>
        </View>




        <View style={styles.drinkContainer}>
        <View style={styles.checkBox}>
        <CheckBox
        tintColors={{ true: ThemeColors.darkBlue, false: '' }}
        disabled={false}
        value={checkbox2Checked}
        onValueChange={(newValue) => handleCheckbox2Change(newValue)}
        />
        </View>
        <View style={styles.drinkName}>
       <Text style={{top:5,fontSize:16}}>7UP - {DrinkPrices} Rs</Text>
        </View>
        <View style={styles.drinkQuantity}>
        { checkbox2Checked == true ?
          <QuantityButton title="-"  onPress={handleCheckbox2Decrement} mainContainerStyle={styles.incrementBtn} disabled={false}/>
        :
        <QuantityButton title="-"  onPress={handleCheckbox2Decrement} mainContainerStyle={styles.incrementBtn} disabled={true}/>
        }
        <Text  style={styles.qtyText}>{checkbox2Checked == true ?  checkbox2Value : '0'}</Text>
        {checkbox2Checked == true ?
        <QuantityButton title="+"onPress={handleCheckbox2Increment} mainContainerStyle={styles.decrementBtn} disabled={false}/>
        :
        <QuantityButton title="+"onPress={handleCheckbox2Increment} mainContainerStyle={styles.decrementBtn} disabled={true}/>
        }
        </View>
        </View>

        <View style={styles.drinkContainer}>
        <View style={styles.checkBox}>
        <CheckBox
        tintColors={{ true: ThemeColors.darkBlue, false: '' }}
        disabled={false}
        value={checkbox3Checked}
        onValueChange={(newValue) => handleCheckbox3Change(newValue)}
        />
        </View>
        <View style={styles.drinkName}>
       <Text style={{top:5,fontSize:16}}>FANTA - {DrinkPrices} Rs</Text>
        </View>
        <View style={styles.drinkQuantity}>
        { checkbox3Checked == true ?
          <QuantityButton title="-"  onPress={handleCheckbox3Decrement} mainContainerStyle={styles.incrementBtn} disabled={false}/>
        :
        <QuantityButton title="-"  onPress={handleCheckbox3Decrement} mainContainerStyle={styles.incrementBtn} disabled={true}/>
        }
        <Text  style={styles.qtyText}>{checkbox3Checked == true ?  checkbox3Value : '0'}</Text>
        {checkbox3Checked == true ?
        <QuantityButton title="+"onPress={handleCheckbox3Increment} mainContainerStyle={styles.decrementBtn} disabled={false}/>
        :
        <QuantityButton title="+"onPress={handleCheckbox3Increment} mainContainerStyle={styles.decrementBtn} disabled={true}/>
        }
        </View>
        </View>

        <View style={styles.drinkContainer}>
        <View style={styles.checkBox}>
        <CheckBox
        tintColors={{ true: ThemeColors.darkBlue, false: '' }}
        disabled={false}
        value={checkbox4Checked}
        onValueChange={(newValue) => handleCheckbox4Change(newValue)}
        />
        </View>
        <View style={styles.drinkName}>
       <Text style={{top:5,fontSize:16}}>DEW - {DrinkPrices} Rs</Text>
        </View>
        <View style={styles.drinkQuantity}>
        { checkbox4Checked == true ?
          <QuantityButton title="-"  onPress={handleCheckbox4Decrement} mainContainerStyle={styles.incrementBtn} disabled={false}/>
        :
        <QuantityButton title="-"  onPress={handleCheckbox4Decrement} mainContainerStyle={styles.incrementBtn} disabled={true}/>
        }
        <Text  style={styles.qtyText}>{checkbox4Checked == true ?  checkbox4Value : '0'}</Text>
        {checkbox4Checked == true ?
        <QuantityButton title="+"onPress={handleCheckbox4Increment} mainContainerStyle={styles.decrementBtn} disabled={false}/>
        :
        <QuantityButton title="+"onPress={handleCheckbox4Increment} mainContainerStyle={styles.decrementBtn} disabled={true}/>
        }
        </View>
        </View>

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