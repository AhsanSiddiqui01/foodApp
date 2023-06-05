
import React from 'react'
import { View, Text,RefreshControl,Image, TouchableOpacity } from 'react-native'
import { useEffect,useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { vh } from '../../utils/Units'
import { icons } from '../../assets/images'
function TotalOrders(props) {
  const navigation = useNavigation();
  const [posts,setPosts] = useState([])
  const [finalData, setFinalData] = useState([])
  var todayDate = new Date();
  var dd = todayDate.getDate();
  var mm = todayDate.getMonth()+1; 
  var twoDigitYear = new Date().getFullYear().toString().substr(-2)
  todayDate = mm+'/'+dd+'/'+twoDigitYear;



  
  var result = [];
  var drink1 = [];
  var drink2 = [];
  var drink3 = [];
  var drink4 = [];
  const checkTotal = async (list) => {
 
    list.map(items => {
        const single = items.userOrder
        
        const findDate = items.date
        findDate == todayDate&&
          single.forEach(function (a) {
      
          if (!this[a.name]) {
              this[a.name] = { 
                              "name": a.name,
                              "QTY":0,
                              "image": a.image,
                            };
              result.push(this[a.name]);
          }
          this[a.name].QTY += a.QTY;
          this[a.name].image = a.image;

        }, Object.create(null))
        // setFinalData(result);
    })
    
    list.map(items => {
      const single = items.userOrder
      
      const findDate = items.date
      findDate == todayDate&&
      single.forEach(function (a) {
    
        if (!this[a.drink1.name]) {
          this[a.drink1.name] = { 
                          "name":a.drink1.name,
                          "quantity":0,
                        };
          drink1.push(this[a.drink1.name]);
      }
      this[a.drink1.name].quantity += a.drink1.quantity;

      }, Object.create(null))
  })

list.map(items => {
  const single = items.userOrder
  
  const findDate = items.date
  findDate == todayDate&&
  single.forEach(function (a) {

    if (!this[a.drink2.name]) {
      this[a.drink2.name] = { 
                      "name":a.drink2.name,
                      "quantity":0,
                    };
      drink2.push(this[a.drink2.name]);
  }
  this[a.drink2.name].quantity += a.drink2.quantity;

  }, Object.create(null))
})

list.map(items => {
  const single = items.userOrder
  
  const findDate = items.date
  findDate == todayDate&&
  single.forEach(function (a) {

    if (!this[a.drink3.name]) {
      this[a.drink3.name] = { 
                      "name":a.drink3.name,
                      "quantity":0,
                    };
      drink3.push(this[a.drink3.name]);
  }
  this[a.drink3.name].quantity += a.drink3.quantity;

  }, Object.create(null))
})

list.map(items => {
  const single = items.userOrder
  
  const findDate = items.date
  findDate == todayDate&&
  single.forEach(function (a) {

    if (!this[a.drink4.name]) {
      this[a.drink4.name] = { 
                      "name":a.drink4.name,
                      "quantity":0,
                    };
      drink4.push(this[a.drink4.name]);
  }
  this[a.drink4.name].quantity += a.drink4.quantity;

  }, Object.create(null))
})
}
const FinalResult = () => {
  var resultF = [];
  // var resultF2 = [];
    result.forEach(function (a) {
   
        if (!this[a.name]) {
          this[a.name] = { name: a.name, QTY: 0,image: a.image};
          resultF.push(this[a.name]);
      }
        this[a.name].QTY += a.QTY;
        this[a.name].image = a.image;
    }, Object.create(null));

    drink1.forEach(function (a) {
      if (!this[a.name]) {
             this[a.name] = { name: a.name, quantity:0};
             resultF.push(this[a.name]);
            }

           this[a.name].quantity += a.quantity;
           
          }, Object.create(null));

          drink2.forEach(function (a) {
            if (!this[a.name]) {
                   this[a.name] = { name: a.name, quantity:0};
                   resultF.push(this[a.name]);
                  }
      
                 this[a.name].quantity += a.quantity;
                 
                }, Object.create(null));

                drink3.forEach(function (a) {
                  if (!this[a.name]) {
                         this[a.name] = { name: a.name, quantity:0};
                         resultF.push(this[a.name]);
                        }
            
                       this[a.name].quantity += a.quantity;
                       
                      }, Object.create(null));

                      drink4.forEach(function (a) {
                        if (!this[a.name]) {
                               this[a.name] = { name: a.name, quantity:0};
                               resultF.push(this[a.name]);
                              }
                  
                             this[a.name].quantity += a.quantity;
                             
                            }, Object.create(null));
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
       console.log('detaailsss',detailsss)
     })
     setPosts(list)
     checkTotal(list)
     FinalResult(result)
    }) 
  }

    
     
  return (
    <View> 
          <TouchableOpacity style={styles.backArrow}
          activeOpacity={.9}
          onPress={()=>{
          navigation.navigate('OrderList',{
            all_product_list:props.all_product_list
          })
        }}
        >
        <Image source={icons.previous} style={styles.backArrowSize}/>
        
        </TouchableOpacity>
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
            {
              item.name === "PEPSI" || item.name === "FANTA" || item.name === "7UP"  || item.name === "DEW"  ?
              <View style={[styles.item,styles.mainContainer]}>
                <Text style={styles.itemName}>
                {item.name} 
              </Text>
              </View>
              :
              <View style={[styles.item,styles.mainContainer]}>
              <Image source={{uri:item.image}} 
              resizeMode='cover'
              style={styles.imgContainer}/>
                <Text style={styles.itemName}>
                {item.name} 
              </Text>
              </View>
            }
          
            <View style={[styles.quantityCenter,styles.mainContainer]}>
              {
                item.name === "PEPSI" || item.name === "FANTA" || item.name === "7UP"  || item.name === "DEW"  ?
                <Text style={styles.itemQuantity}>
                {item.quantity} 
              </Text>
              :
              <Text style={styles.itemQuantity}>
              {item.QTY} 
            </Text>
              }
            
            </View>
            </View>
          ))}
    </ScrollView>
    </View>
  )
}
export default TotalOrders;