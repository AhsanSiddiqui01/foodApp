
import React from 'react'
import { View, Text,RefreshControl,Image } from 'react-native'
import { useEffect,useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { vh } from '../../utils/Units'
function TotalOrders() {
  const [posts,setPosts] = useState([])
  const [finalData, setFinalData] = useState([])
  var todayDate = new Date();
  var dd = todayDate.getDate();
  var mm = todayDate.getMonth()+1; 
  var twoDigitYear = new Date().getFullYear().toString().substr(-2)
  todayDate = mm+'/'+dd+'/'+twoDigitYear;



  
  var result = [];
  const checkTotal = async (list) => {
    list.map(items => {
        const single = items.userOrder
        console.log('singletime',single)
        const findDate = items.date
        findDate == todayDate&&
          single.forEach(function (a) {
          if (!this[a.name]) {
              this[a.name] = { 
                            //   "id":a.id, 
                            //   "description": a.description,
                              "name": a.name,
                              "QTY":0,
                              // "price": a.price,
                            //   "shop": a.shop,
                            //   "notes": a.notes,
                              "image": a.image 
                            };
              result.push(this[a.name]);
          }
          this[a.name].QTY += a.QTY;
          this[a.name].image = a.image;
          // this[a.name].price = a.price;
        }, Object.create(null))
        // setFinalData(result);
    })

}
const FinalResult = () => {
  var resultF = [];
    result.forEach(function (a) {
        if (!this[a.name]) {
            this[a.name] = { name: a.name, QTY: 0,image: a.image };
            resultF.push(this[a.name]);
        }
        this[a.name].QTY += a.QTY;
        this[a.name].image = a.image;
    }, Object.create(null));
         console.log('otherreust',resultF)
         setFinalData(resultF);
}
  useEffect(()=>{
    getUserOrder()
        },[]) 
  
  const getUserOrder = async () => {
  
    const list = []
    await firestore().collection('orderList').orderBy('orderDetail','desc').get()
   .then((querySnapShot) => {
     querySnapShot.forEach(doc => {
       const detailsss = doc.data().orderDetail
       const {time,date,userId,userName,userOrder}  = detailsss
       list.push({
         time,
         date,
         userName,
         userId,
         userOrder
       })
     })
     setPosts(list)
     checkTotal(list)
     FinalResult(result)
   }) 
       
     }

    
     
  return (
    <View> 
        <View style={styles.container}> 
          <View style={styles.headingStyle}>
            <Text style={styles.listHeading}>Food</Text>
          </View>
          <View style={styles.headingStyle}>
            <Text style={styles.listHeading}>Quantity</Text>
          </View>
        </View>
    <ScrollView  contentContainerStyle={{paddingBottom:16 * vh}}>
    {finalData.length === 0
        ? null
        : finalData.map((item) => (
          <View style={styles.container} >
            <View style={[styles.item,styles.mainContainer]}>
            <Image source={{uri:item.image}} 
            resizeMode='cover'
            style={styles.imgContainer}/>
              <Text style={styles.itemName}>
              {item.name} 
            </Text>
            </View>
            <View style={[styles.quantityCenter,styles.mainContainer]}>
              <Text style={styles.itemQuantity}>
              {item.QTY} 
            </Text>
            </View>
            </View>
          ))}
    </ScrollView>
    </View>
  )
}
export default TotalOrders;