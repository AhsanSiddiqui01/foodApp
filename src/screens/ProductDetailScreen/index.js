import React, { useEffect,useState } from 'react';
import { View, Text,Image,ScrollView, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import actionTypes from '../../redux/actions/ActionTypes';
import { showToast, isOrderTimeOpen, ORDER_TIME_TEXT } from '../../utils';
import { connect } from 'react-redux';
import { icons, getFoodImage } from '../../assets/images';

const EXTRA_SECTIONS = [
  { category: 'drink', title: 'Cold Drinks' },
  { category: 'side', title: 'Add Sides' },
];

function ProductDetails(props) {
  const [QTY, setNum] = useState(1);
  const [notes, setNotes] = useState('');
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const data = props.route.params.foodList;

  useEffect(()=>{
    firestore().collection('extras').orderBy('order').get()
      .then((snapshot) => {
        setExtras(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      })
      .catch((error) => console.log('extras error', error))
  },[])

  const incNum = () => { if (QTY < 99) setNum(QTY + 1) };
  const decNum = () => { if (QTY > 1) setNum(QTY - 1) };

  const toggleExtra = (id) => {
    setSelectedExtras((current) => ({ ...current, [id]: !current[id] }));
  };

  const chosenExtras = extras.filter((extra) => selectedExtras[extra.id]);
  const total = Number(data.price || 0) * QTY
    + chosenExtras.reduce((sum, extra) => sum + Number(extra.price || 0), 0);

  // Main item plus each chosen extra go to the cart as separate items, so totals count them too
  const addItemsToCart = () => {
    dispatch({type:actionTypes.ADD_TO_CART,payload:data,notes,QTY})
    chosenExtras.forEach((extra) => {
      dispatch({type:actionTypes.ADD_TO_CART,payload:extra,notes:'',QTY:1})
    })
    setNotes('')
    setNum(1)
    setSelectedExtras({})
  };

  const addToCart = () => {
    if( !isOrderTimeOpen() ){
      return showToast(`Orders are closed. Order between ${ORDER_TIME_TEXT}`);
    }
    addItemsToCart()
    showToast('Added to cart')
    navigation.navigate('OurProudct')
  }

  const OrderRn = () => {
    if( !isOrderTimeOpen() ){
      return showToast(`Orders are closed. Order between ${ORDER_TIME_TEXT}`);
    }
    addItemsToCart()
    navigation.navigate('MenuStack', { screen: 'MenuScreen' })
  }

  const renderExtra = (extra) => {
    const selected = !!selectedExtras[extra.id];
    return (
      <TouchableOpacity
        key={extra.id}
        style={[styles.extraCard, selected && styles.extraCardSelected]}
        activeOpacity={0.8}
        onPress={() => toggleExtra(extra.id)}
      >
        <Image source={getFoodImage(extra.image)} style={styles.extraImage} />
        <Text style={styles.extraName} numberOfLines={1}>{extra.name}</Text>
        <Text style={styles.extraPrice}>+ Rs {extra.price}</Text>
        <View style={[styles.extraCheck, selected && styles.extraCheckSelected]}>
          <Text style={styles.extraCheckText}>{selected ? '✓' : '+'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backArrow}
        activeOpacity={.8}
        onPress={()=> navigation.navigate('OurProudct')}
      >
        <Image source={icons.previous} style={styles.backArrowSize}/>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={getFoodImage(data.image)} style={styles.TopImage} resizeMode='cover'/>

        <View style={styles.sheet}>
          <View style={styles.titleRow}>
            <View style={styles.titleInfo}>
              <Text style={styles.name}>{data.name}</Text>
              {!!data.shop && <Text style={styles.shop}>{data.shop}</Text>}
            </View>
            <Text style={styles.price}>Rs {data.price}</Text>
          </View>
          {!!data.description && <Text style={styles.description}>{data.description}</Text>}

          <View style={styles.qtyRow}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepperBtn} onPress={decNum} activeOpacity={0.7}>
                <Text style={styles.stepperBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{QTY}</Text>
              <TouchableOpacity style={[styles.stepperBtn, styles.stepperBtnPrimary]} onPress={incNum} activeOpacity={0.7}>
                <Text style={[styles.stepperBtnText, styles.stepperBtnTextPrimary]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {EXTRA_SECTIONS.map(({ category, title }) => {
            const items = extras.filter((extra) => extra.category === category);
            if (items.length === 0) {
              return null;
            }
            return (
              <View key={category}>
                <Text style={[styles.sectionTitle, styles.extrasTitle]}>{title}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.extrasRow}>
                  {items.map(renderExtra)}
                </ScrollView>
              </View>
            );
          })}

          <Text style={[styles.sectionTitle, styles.extrasTitle]}>Special Instructions</Text>
          <TextInput
            placeholder="e.g. less spicy, no onion"
            placeholderTextColor="#9AA3B5"
            style={styles.moreDetail}
            value={notes}
            onChangeText={(text) => setNotes(text)}
            multiline
          />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs {total}</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionBtn, styles.cartBtn]} activeOpacity={0.8} onPress={addToCart}>
              <Text style={[styles.actionBtnText, styles.cartBtnText]}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.orderBtn]} activeOpacity={0.8} onPress={OrderRn}>
              <Text style={styles.actionBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>
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
