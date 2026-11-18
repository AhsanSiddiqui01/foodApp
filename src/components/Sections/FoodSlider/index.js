import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import styles, { SLIDE_WIDTH, SLIDE_GAP } from './styles';
import { getFoodImage } from '../../../assets/images';

const AUTO_SCROLL_MS = 3500;

// Featured dishes (foodList document ids) with their banner copy; missing ids are skipped
const FEATURED = [
  { id: 'chicken-biryani', tag: "Today's Special", line: 'Spicy & loaded with flavour' },
  { id: 'zinger-burger', tag: 'Crispy Favourite', line: 'Add a cold drink on the side' },
  { id: 'kabuli-pulao', tag: 'Chef Recommends', line: 'Rich, fragrant and filling' },
  { id: 'mix-salad', tag: 'Fresh & Healthy', line: 'Light lunch, big taste' },
];

// Auto-playing banner carousel of featured dishes; tapping a banner opens the dish
const FoodSlider = ({ items }) => {
  const navigation = useNavigation();
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  const slides = FEATURED
    .map((feature) => {
      const food = (items || []).find((item) => item.id === feature.id);
      return food ? { ...feature, food } : null;
    })
    .filter(Boolean);

  useEffect(() => {
    if (slides.length < 2) {
      return undefined;
    }
    const timer = setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % slides.length;
        listRef.current?.scrollToOffset({ offset: next * (SLIDE_WIDTH + SLIDE_GAP), animated: true });
        return next;
      });
    }, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const onScrollEnd = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    setIndex(Math.round(offset / (SLIDE_WIDTH + SLIDE_GAP)));
  };

  const renderSlide = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.slide}
      onPress={() => navigation.navigate('ProductDetail', { foodList: item.food })}
    >
      <Image source={getFoodImage(item.food.image)} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
        style={styles.shade}
      />
      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
      <View style={styles.caption}>
        <Text style={styles.title} numberOfLines={1}>{item.food.name}</Text>
        <Text style={styles.line} numberOfLines={1}>{item.line}</Text>
        <View style={styles.pricePill}>
          <Text style={styles.priceText}>Rs {item.food.price}  •  Order now</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLIDE_WIDTH + SLIDE_GAP}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onMomentumScrollEnd={onScrollEnd}
      />
      <View style={styles.dots}>
        {slides.map((slide, i) => (
          <View key={slide.id} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

export default FoodSlider;
