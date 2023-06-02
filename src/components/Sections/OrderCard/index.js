import React,{useState} from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { vw } from '../../../utils/Units';

export default function OrderCart (props) {

  console.log('finddingg',props.data)
   
    const {data,onPress} = props
    
    // const coldDrink = data.drinks
    // console.log('coldDrink',coldDrink)
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

    const randomColor = () => {
        const red   = Math.floor(Math.random() * 230)
        const blue  = Math.floor(Math.random() * 200)
        const green = Math.floor(Math.random() * 150)
        return `rgb(${red},${green},${blue})`
    }
    // const [delRecord, setData] = useState([props.data.id])
    // const deleteRecord = (props) => {
    //    console.log('indexingggg',delRecord)
    //   setData(delRecord.filter((e, i) => i !== props));
    // };

    // const [delRecord, setData] = useState()
    
    // const deleteRecord = (data) => {
    //   const item = data.cart
    //   console.log('teteststs',item.splice(item,1))
    //   item.splice(item,1);
    //   return item;
    // };
  return (
    <View style={styles.container}>
    <View 
    style={styles.card}
    >
        <View style={styles.productImageView}>
         <Image
          resizeMode='cover'
          style={styles.imgContainer}
          source={{uri: data.image}}
        />
        </View>
        <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.name}>Price: {data.price}</Text>
        {props.data.QTY != '' ? 
        <Text style={styles.name}>QTY: {data.QTY}</Text>
        :
        <Text style={styles.name}>QTY: 1</Text>
        }
        {/* <Text style={styles.name}>Drinks: 
        {data.map((item)=>{
          console.log(item)
        })}</Text> */}

        {/* {data.drinks.map((items)=>(
          <Text key={items.id}>Drinks:{items.name}</Text>
        ))} */}
   
       
        
        </View>
          <TouchableOpacity onPress={onPress} style={{
            width:115,alignItems:'flex-end'}}>
          <Image
          source={require('../../../assets/images/icons/remove.png')}
          style={{width:35,height:35}}
          />
          </TouchableOpacity>
    
     </View>
          <View style={styles.drinksandNotesContainer}>
            
            {
            data.drink1.quantity == 0 && data.drink2.quantity == 0 && data.drink3.quantity == 0 && data.drink4.quantity == 0 ? 
            <Text style={styles.drinksandNotes}>Drinks: No Drinks
            </Text>
            :
            <Text style={styles.drinksandNotes}>Drinks: 
             {data.drink1.name}({data.drink1.quantity}) <></>
             {data.drink2.name}({data.drink2.quantity}) <></>
             {data.drink3.name}({data.drink3.quantity}) <></>
             {data.drink4.name}({data.drink4.quantity}) <></>
            </Text>
            
            }
            
           
          
          {
          props.data.notes != ''?
          <Text  style={styles.drinksandNotes} numberOfLines={1}>Notes: {data.notes}</Text>
          :
          <Text style={styles.drinksandNotes}>Notes: No note</Text>
        }
          </View>
          </View>
  );
}


