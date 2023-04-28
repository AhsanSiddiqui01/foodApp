import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import styles from './styles';
export default function UserOrderCart (props) {
  
  const {item} = props
  const unameOrders = item.userName
  const displayDate    = item.date
  const displayTIme    = item.time
  const itemQty        = item.userOrder

  


  let ItemNameAndQty     = "";
 
  //Change Date Format As system Required//
  
  var todayDate = new Date();
  var dd = todayDate.getDate();
  // var dd2 = todayDate2.getDate();
  // console.log('currenttodayDate',todayDate + ', Displaydd: ' + dd);
  var mm = todayDate.getMonth()+1; 
  // var mm2 = todayDate.getMonth()+1;
  var twoDigitYear = new Date().getFullYear().toString().substr(-2)
  // var twoDigitYear2 = new Date().getFullYear().toString()
  // console.log('currentmm',mm + ', DisplaytwoDigit: ' + twoDigitYear);
  
  // if(dd<10){dd='0'+dd;} 
  // if(mm<10){mm='0'+mm;} 
  
  // if(dd2<10){dd2=dd2;} 
  // if(mm2<10){mm2=mm2;} 

  todayDate = mm+'/'+dd+'/'+twoDigitYear;

  
  // itemQty.forEach(element => {
  //   if(element.name === element.name && displayDate == todayDate)
  //   {
  //     ItemNameAndQty    = ItemNameAndQty   + element.name + ' - ' + element.QTY + "\n ";
  //   }
  // });
  const mergeFruits = itemQty => {
    const result = {}; //(1)
  
    itemQty.forEach(basket => { //(2)
      for (let [QTY, value] of Object.entries(basket)) { //(3)
        if (result[QTY]) { //(4)
          result[QTY] += value; //(5)
        } else { //(6)
          result[QTY] = value;
        }
      }
    });
    return result; //(7)
  };
  const mergedObject = mergeFruits(itemQty);

console.log('checkkkk',mergedObject);
  const totalQty = {
    itemDetail:ItemNameAndQty
    }
    console.log("abcorder",totalQty)
    
  
  return (
    <View>
    {displayDate == todayDate  ? 
        <View style={styles.orderByContainer}>
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        <Text style={styles.orderTexttextField}>Order By: {unameOrders}</Text>
        <Text style={styles.orderTexttextField}>Date:   {displayDate}</Text>
        </View>
        <Text style={styles.orderTexttextField}>Time:   {displayTIme}</Text>
        <View style={{flex:2,flexDirection:"row",justifyContent:'space-between'}}>
        </View>
    </View>
    :
    null }
    
   
        {displayDate == todayDate  && (item.userOrder)
      ? 
      
        item.userOrder.map((item)=>
        <View style={styles.mainContainer1}>
        <TouchableOpacity 
        style={styles.mainContainer2}
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
        
        <Text style={styles.textField}>{item.name}</Text>
        <Text style={styles.textField}>Price: {item.price}</Text>
        {item.QTY != '' ? 
        <Text style={styles.textField}>QTY: {item.QTY}</Text>
        :
        <Text style={styles.textField}>QTY: 1</Text>
        }
       
        </View> 
      
        </TouchableOpacity>
        {
          item.notes != ''?
         <Text style={{color:'red'}}>Notes: <Text style={styles.textFieldNotes} numberOfLines={1}>{item.notes}</Text></Text> 
          :
        <Text style={{color:'red'}}>Notes: <Text style={styles.textFieldNotes}>No note</Text></Text>
        }
        </View>
        )
        : 
        null
    }
      
     
    
     </View>
  );
}


