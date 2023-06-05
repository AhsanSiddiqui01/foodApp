import React,{useEffect,useState} from 'react';
import { View, Text,StyleSheet,Image,ScrollView,SafeAreaView,TouchableOpacity,FlatList } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import HistoryCart from '../../components/Sections/HistoryCard';
import firestore from '@react-native-firebase/firestore'
import styles from './styles';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ThemeColors from '../../utils/ThemeColors';
import { icons } from '../../assets/images';

function MyOrders(props) {
  const [posts,setPosts] = useState([])
  console.log('chekccprssss',props)
  const navigation = useNavigation();
  const [arrayList,setArrayList] = useState([])
  const cartData = useSelector(state=>state)
  useEffect(()=>{
    getSingleUserOrders()
    firestore().collection('orderList').onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === 'added') {
          getSingleUserOrders();
        }
      });
    });
    // console.log('myOrderList',orderList.my_orders)
  },[]) 
  const [delRecord, setData] = useState()
  


  const getSingleUserOrders = async () => {
  
 const list = []
 await firestore().collection('orderList').orderBy('orderDetail','desc').get()
.then((querySnapShot) => {
  console.log("avcvddd",querySnapShot.size)
  querySnapShot.forEach(doc => {
    console.log("documenttsss",doc)
    const detailsss = doc.data().orderDetail
    const {time,date,userId,userName,userOrder,totalPrice}  = detailsss
    console.log('cheddddd',detailsss)
    list.push({
      totalPrice,
      time,
      date,
      userName,
      userId,
      userOrder
    })
  })
  setPosts(list)
  console.log("listtt",posts)
}) 
    
  }

  

  // const deleteRecord = (props) => {
  //   console.log('checckkkuseridd',props.id)
  //   const checkId = props.id
  //   firestore().collection('orderList').get().then(querySnap=>{
  //     querySnap.docs.map(async docSnap=>{
  //       const adminTokens =  docSnap.data().orderDetail
  //       const abcc = adminTokens.userOrder
  //       const fireStoreUid   = adminTokens.userId
  //       {fireStoreUid == checkId ?
  //         abcc.map((item)=>{
  //             const checkSingleItemId = item.id
  //           console.log('checkkoriddd',checkSingleItemId)
           
  //         })
  //         :
  //         null
  //       }
        
        
       
  //      })
  //    })
  // };
  return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backArrow}
          activeOpacity={.9}
          onPress={()=>{
          navigation.navigate('OurProudct',{
            all_product_list:props.all_product_list
          })
        }}
        >
        <Image source={icons.previous} style={styles.backArrowSize}/>
        
        </TouchableOpacity>
         <FlatList
          data={posts}
          renderItem={({item}) => 
          <HistoryCart 
          item={item}
          key={item.id}
          // onPress={()=>deleteRecord(props)}
          />
        }
          keyExtractor={item => item.id}
          ListEmptyComponent={()=>
            <View style={{marginTop:100,alignContent:'center',alignSelf:'center',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
              <Image source={icons.orderCart} style={{width:150,height:150}}/>
            <Text style={{fontSize:17,color:ThemeColors.darkBlue}}>You have no previous record</Text>
          </View>
    }
      />
      </View>
  );
}
const mapStateToProps = (state) => {
  console.log('myOrderss',[state.GeneralReducer.cart])
  return {
    cart: state.GeneralReducer.cart,
    name:state.GeneralReducer.name,
    id:state.GeneralReducer.id,
    apcontrol: state.GeneralReducer.apcontrol,
    my_orders:state.GeneralReducer.my_orders
  };
};
export default connect(mapStateToProps)(MyOrders);