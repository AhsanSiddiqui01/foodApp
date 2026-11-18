import firestore from '@react-native-firebase/firestore';
import DEFAULT_EXTRAS from '../data/extras.json';

// Add-ons (cold drinks, sides). Firestore `extras` wins so prices can be edited in the console;
// the bundled list is used until it is seeded, or if it can't be read.
export const fetchExtras = async () => {
  try {
    const snapshot = await firestore().collection('extras').orderBy('order').get();
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  } catch (error) {
    console.log('extras error', error);
  }
  return DEFAULT_EXTRAS;
};
