import React,{useState} from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

export default function OrderCart (props) {

  // console.log('finddingg',props.data.QTY)
   
    const {data,onPress} = props
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
    <TouchableOpacity 
    style={styles.mainContainer}
    // style={styles.mainContainer}
    activeOpacity={.6}
    >
        <View style={styles.productImageView}>
         <Image
          resizeMode='cover'
          style={styles.imgContainer}
          source={{uri: data.image}}
        />
        </View>
        <View >
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.name}>Price: {data.price}</Text>
        {props.data.QTY != '' ? 
        <Text style={styles.name}>QTY: {data.QTY}</Text>
        :
        <Text style={styles.name}>QTY: 1</Text>
        }
        {
          props.data.notes != ''?
          <Text style={styles.name} numberOfLines={1}>Notes: {data.notes}</Text>
          :
          <Text style={styles.name}>Notes: No note</Text>
        }
        
        </View>
          <TouchableOpacity onPress={onPress}>
          <Image
          source={require('../../../assets/images/icons/remove.png')}
          style={{width:35,height:35,marginLeft:68}}
          />
          </TouchableOpacity>
    
     </TouchableOpacity>
  );
}


