import React, { useCallback, useState } from 'react';
import { themeColors } from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { getFoodImage, icons } from '../../assets/images';
import { CATEGORIES, categoryOf } from '../../data/categories';
import DEFAULT_EXTRAS from '../../data/extras.json';
import ConfirmModal from '../../components/Sections/ConfirmModal';
import { showToast } from '../../utils';

const TABS = [
  { key: 'dishes', label: 'Dishes', collection: 'foodList' },
  { key: 'extras', label: 'Drinks & Sides', collection: 'extras' },
];

const categoryLabel = (item, isExtra) => {
  if (isExtra) {
    return item.category === 'drink' ? 'Drink' : 'Side';
  }
  const category = CATEGORIES.find((entry) => entry.key === categoryOf(item));
  return category ? category.label : 'Other';
};

// Admin: list, add, edit and delete menu dishes and add-ons (live from Firestore)
function MenuManager({ navigation }) {
  const [tab, setTab] = useState('dishes');
  const [lists, setLists] = useState({ dishes: [], extras: [] });
  const [loaded, setLoaded] = useState({ dishes: false, extras: false });
  const [toDelete, setToDelete] = useState(null);
  const [importing, setImporting] = useState(false);

  // Re-subscribe whenever the tab is opened, so a listener that once failed (e.g. before the
  // rules were published) does not stay dead
  useFocusEffect(useCallback(() => {
    const unsubscribers = TABS.map(({ key, collection }) =>
      firestore().collection(collection).onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        items.sort((a, b) =>
          key === 'extras'
            ? (a.order || 0) - (b.order || 0)
            : (a.name || '').localeCompare(b.name || ''),
        );
        setLists((current) => ({ ...current, [key]: items }));
        setLoaded((current) => ({ ...current, [key]: true }));
      }, (error) => console.log(`${collection} snapshot error`, error)),
    );
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, []));

  const isExtra = tab === 'extras';
  const items = lists[tab];
  const activeTab = TABS.find((entry) => entry.key === tab);

  const confirmDelete = () => {
    const { item, collection } = toDelete;
    setToDelete(null);
    firestore().collection(collection).doc(item.id).delete()
      .then(() => showToast(`${item.name} deleted`))
      .catch((error) => {
        console.log('delete error', error);
        showToast('Could not delete. Please try again.');
      });
  };

  // One tap to copy the bundled drinks & sides into Firestore so they become editable
  const importDefaultExtras = () => {
    setImporting(true);
    const batch = firestore().batch();
    DEFAULT_EXTRAS.forEach(({ id, ...extra }, index) => {
      batch.set(firestore().collection('extras').doc(id), { ...extra, order: index });
    });
    batch.commit()
      .then(() => showToast('Drinks & sides added'))
      .catch((error) => {
        console.log('import extras error', error);
        showToast('Could not import. Please try again.');
      })
      .finally(() => setImporting(false));
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={getFoodImage(item.image)} style={styles.rowImage} resizeMode="cover" />
      <View style={styles.rowInfo}>
        <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {categoryLabel(item, isExtra)}  •  <Text style={styles.rowPrice}>Rs {item.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('MenuItemForm', { kind: isExtra ? 'extra' : 'dish', item })}
      >
        <Image source={icons.edit} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, styles.deleteButton]}
        activeOpacity={0.7}
        onPress={() => setToDelete({ item, collection: activeTab.collection })}
      >
        <Image source={icons.trash} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => {
    if (!loaded[tab]) {
      return <ActivityIndicator style={styles.loader} color={themeColors().primary} />;
    }
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>
          {isExtra ? 'No drinks & sides yet' : 'No dishes yet'}
        </Text>
        <Text style={styles.emptyText}>
          {isExtra
            ? 'Import the default drinks & sides, or add your own with the + button.'
            : 'Add your first dish with the + button.'}
        </Text>
        {isExtra && (
          <TouchableOpacity style={styles.importButton} activeOpacity={0.85} onPress={importDefaultExtras} disabled={importing}>
            {importing
              ? <ActivityIndicator color="white" />
              : <Text style={styles.importText}>Import default drinks & sides</Text>}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        {TABS.map((entry) => (
          <TouchableOpacity
            key={entry.key}
            style={[styles.segmentBtn, tab === entry.key && styles.segmentBtnActive]}
            activeOpacity={0.8}
            onPress={() => setTab(entry.key)}
          >
            <Text style={[styles.segmentText, tab === entry.key && styles.segmentTextActive]}>
              {entry.label} ({lists[entry.key].length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('MenuItemForm', { kind: isExtra ? 'extra' : 'dish' })}
      >
        <Image source={icons.plusWhite} style={styles.fabIcon} />
        <Text style={styles.fabText}>{isExtra ? 'Add Item' : 'Add Dish'}</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={!!toDelete}
        title={toDelete ? `Delete ${toDelete.item.name}?` : ''}
        message="It will be removed from the menu for everyone. This can't be undone."
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </View>
  );
}

export default MenuManager;
