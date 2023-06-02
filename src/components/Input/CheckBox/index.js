import CheckBox from '@react-native-community/checkbox';
import React,{useState} from 'react';
import { Text,View } from 'react-native';
import QuantityButton from '../../Buttons/QuantityButton';
import styles from './styles';

const CheckButton = () => {
    const [toggleCheckBoxP, setToggleCheckBoxP] = useState(false)
    const [toggleCheckBoxS, setToggleCheckBoxS] = useState(false)
    const [toggleCheckBoxM, setToggleCheckBoxM] = useState(false)
    const [toggleCheckBoxF, setToggleCheckBoxF] = useState(false)

    let [QTY, setNum]= useState(1);
  let[price,setPrice] = useState()
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
    return(
    <View style={{backgroundColor:'lightgrey',elevation:5,margin:10}}>
    <Text>
       <CheckBox
        disabled={false}
        value={toggleCheckBoxP}
        onValueChange={(newValue) => setToggleCheckBoxP(newValue)}
        />
        Pepsi - 70 Rs 
        <View style={styles.qtyContainer}>
        <QuantityButton title="-"  onPress={decNum} mainContainerStyle={styles.incrementBtn}/>
        <Text onChangeText={handleChange} style={styles.qtyText}>{QTY}</Text>
        <QuantityButton title="+"onPress={incNum} mainContainerStyle={styles.decrementBtn}/>
        </View>
    </Text>

    <Text>
       <CheckBox
        disabled={false}
        value={toggleCheckBoxS}
        onValueChange={(newValue) => setToggleCheckBoxS(newValue)}
        />
        7up - 70 Rs
    </Text>
     </View>
)
}
export default CheckButton