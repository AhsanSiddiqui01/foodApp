import React, { useLayoutEffect, useState } from 'react';
import { themeColors, themedPills } from '../../theme';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { foodImages, getFoodImage, icons } from '../../assets/images';
import { CATEGORIES, categoryOf } from '../../data/categories';
import { showToast } from '../../utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadMenuPhoto } from '../../utils/cloudinary';

const DISH_CATEGORIES = CATEGORIES.filter((category) => category.key !== 'all');
const EXTRA_CATEGORIES = themedPills([
  { key: 'drink', label: 'Drink', emoji: '🥤', color: '#1458C4', background: '#E8F0FD' },
  { key: 'side', label: 'Side', emoji: '🥗', color: '#2E9E5B', background: '#E7F6EC' },
]);
const DRINK_PHOTOS = Object.keys(foodImages).filter((key) => key.startsWith('drink-'));
const FOOD_PHOTOS = Object.keys(foodImages).filter((key) => !key.startsWith('drink-'));
const isLink = (value) => /^https?:\/\//i.test(value || '');

// Admin: add a new dish / drink / side, or edit an existing one
function MenuItemForm({ navigation, route }) {
  const { kind, item } = route.params || {};
  const isExtra = kind === 'extra';
  const editing = !!item;
  const categories = isExtra ? EXTRA_CATEGORIES : DISH_CATEGORIES;

  const [name, setName] = useState(item ? item.name || '' : '');
  const [price, setPrice] = useState(item ? String(item.price || '') : '');
  const [shop, setShop] = useState(item ? item.shop || '' : 'Foody Kitchen');
  const [description, setDescription] = useState(item ? item.description || '' : '');
  const [category, setCategory] = useState(
    item ? (isExtra ? item.category || 'drink' : categoryOf(item)) : categories[0].key,
  );
  // `image` is a bundled photo key or an uploaded photo URL; `link` is only a manually pasted URL.
  // New items start without a photo so nothing looks pre-filled; the admin must pick one.
  const [image, setImage] = useState(item ? item.image || '' : '');
  const [link, setLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Gallery photo -> Cloudinary; Firestore only keeps the returned URL
  const pickFromGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 1200, maxHeight: 1200, quality: 0.8 },
      (result) => {
        if (result.didCancel) {
          return;
        }
        const asset = result.assets && result.assets[0];
        if (result.errorCode || !asset || !asset.uri) {
          console.log('image picker error', result.errorCode, result.errorMessage);
          showToast('Could not open that photo. Please try another one.');
          return;
        }
        setUploading(true);
        uploadMenuPhoto(asset)
          .then((url) => {
            setImage(url);
            setLink('');
          })
          .catch((error) => {
            console.log('photo upload error', error);
            showToast('Photo upload failed. Please check your internet and try again.');
          })
          .finally(() => setUploading(false));
      },
    );
  };

  useLayoutEffect(() => {
    const noun = isExtra ? 'Drink / Side' : 'Dish';
    navigation.setOptions({ headerTitle: `${editing ? 'Edit' : 'Add'} ${noun}` });
  }, [navigation, editing, isExtra]);

  const save = () => {
    const cleanName = name.trim();
    const amount = Number(price);
    if (!cleanName) {
      return showToast('Please enter a name');
    }
    if (!price.trim() || !(amount > 0)) {
      return showToast('Please enter a valid price');
    }
    const finalImage = link.trim() ? link.trim() : image;
    if (link.trim() && !isLink(link.trim())) {
      return showToast('Image link must start with http:// or https://');
    }
    if (!finalImage) {
      return showToast('Please choose a photo');
    }

    const data = isExtra
      ? { name: cleanName, price: String(amount), image: finalImage, category }
      : {
        name: cleanName,
        price: String(amount),
        image: finalImage,
        category,
        shop: shop.trim(),
        description: description.trim(),
      };
    // New extras go to the end of their list
    if (isExtra && !editing) {
      data.order = Date.now();
    }

    const collection = firestore().collection(isExtra ? 'extras' : 'foodList');
    const write = editing ? collection.doc(item.id).set(data, { merge: true }) : collection.add(data);
    setSaving(true);
    write
      .then(() => {
        showToast(`${cleanName} ${editing ? 'updated' : 'added'}`);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('save menu item error', error);
        showToast('Could not save. Please try again.');
        setSaving(false);
      });
  };

  const previewImage = link.trim() && isLink(link.trim()) ? link.trim() : image;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View>
          {previewImage
            ? <Image source={getFoodImage(previewImage)} style={styles.preview} resizeMode="cover" />
            : (
              <View style={[styles.preview, styles.previewEmpty]}>
                <Image source={icons.plusWhite} style={styles.previewIcon} />
                <Text style={styles.previewText}>Choose a photo below</Text>
              </View>
            )}
          {uploading && (
            <View style={styles.uploadingOverlay}>
              <ActivityIndicator color="white" size="large" />
              <Text style={styles.uploadingText}>Uploading photo...</Text>
            </View>
          )}
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={isExtra ? 'e.g. Coca-Cola' : 'e.g. Chicken Biryani'}
          placeholderTextColor={themeColors().placeholder}
        />

        <Text style={styles.label}>Price (Rs)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ''))}
          placeholder="e.g. 350"
          placeholderTextColor={themeColors().placeholder}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.chipsWrap}>
          {categories.map((entry) => {
            const selected = category === entry.key;
            return (
              <TouchableOpacity
                key={entry.key}
                activeOpacity={0.8}
                onPress={() => setCategory(entry.key)}
                style={[styles.chip, { backgroundColor: selected ? entry.color : entry.background }]}
              >
                <Text style={styles.chipEmoji}>{entry.emoji}</Text>
                <Text style={[styles.chipText, { color: selected ? 'white' : entry.color }]}>{entry.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {!isExtra && (
          <>
            <Text style={styles.label}>Shop / Kitchen</Text>
            <TextInput
              style={styles.input}
              value={shop}
              onChangeText={setShop}
              placeholder="e.g. Foody Kitchen"
              placeholderTextColor={themeColors().placeholder}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={description}
              onChangeText={setDescription}
              placeholder="e.g. Spicy chicken biryani with raita"
              placeholderTextColor={themeColors().placeholder}
              multiline
            />
          </>
        )}

        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.galleryButton} activeOpacity={0.85} onPress={pickFromGallery}>
          <Text style={styles.galleryText}>📷  Choose from Gallery</Text>
        </TouchableOpacity>
        <Text style={styles.subLabel}>Or pick one of ours</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoRow}>
          {(isExtra ? [...DRINK_PHOTOS, ...FOOD_PHOTOS] : [...FOOD_PHOTOS, ...DRINK_PHOTOS]).map((key) => {
            const selected = !link.trim() && image === key;
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                onPress={() => { setImage(key); setLink(''); }}
                style={[styles.photo, selected && styles.photoSelected]}
              >
                <Image source={foodImages[key]} style={styles.photoImage} resizeMode="cover" />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={setLink}
          placeholder="Or paste an image link (https://...)"
          placeholderTextColor={themeColors().placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />

        <TouchableOpacity style={[styles.saveButton, (saving || uploading) && styles.saveButtonDisabled]} activeOpacity={0.85} onPress={save} disabled={saving || uploading}>
          {saving
            ? <ActivityIndicator color="white" />
            : <Text style={styles.saveText}>{editing ? 'Save Changes' : (isExtra ? 'Add Item' : 'Add Dish')}</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default MenuItemForm;
