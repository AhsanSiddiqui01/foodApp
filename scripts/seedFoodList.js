// One-time seed for the Firestore foodList collection.
// Usage: node scripts/seedFoodList.js path/to/serviceAccountKey.json
// Re-running is safe: each item has a fixed document ID, so it is overwritten, not duplicated.
const admin = require('firebase-admin');
const path = require('path');

const keyPath = process.argv[2];
if (!keyPath) {
  console.error('Usage: node scripts/seedFoodList.js path/to/serviceAccountKey.json');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve(keyPath))),
});

// image = key from src/assets/images (foodImages); category = key from src/data/categories.js;
// prices are placeholders, edit them in the console
const SHOP = 'Foody Kitchen';
const foodList = [
  { id: 'daal-chawal',     name: 'Daal Chawal',     price: '250', image: 'image1',  description: 'Yellow daal with plain rice', category: 'rice' },
  { id: 'chicken-pulao',   name: 'Chicken Pulao',   price: '350', image: 'image2',  description: 'Chicken yakhni pulao with raita', category: 'rice' },
  { id: 'chicken-biryani', name: 'Chicken Biryani', price: '350', image: 'image3',  description: 'Spicy chicken biryani', category: 'rice' },
  { id: 'green-salad',     name: 'Green Salad',     price: '150', image: 'image4',  description: 'Fresh green salad', category: 'healthy' },
  { id: 'naan',            name: 'Naan',            price: '30',  image: 'image5',  description: 'Tandoori naan', category: 'breads' },
  { id: 'roti',            name: 'Roti',            price: '20',  image: 'image6',  description: 'Fresh chapati', category: 'breads' },
  { id: 'beef-pulao',      name: 'Beef Pulao',      price: '400', image: 'image7',  description: 'Beef yakhni pulao', category: 'rice' },
  { id: 'beef-biryani',    name: 'Beef Biryani',    price: '400', image: 'image8',  description: 'Spicy beef biryani', category: 'rice' },
  { id: 'anda-paratha',    name: 'Anda Paratha',    price: '200', image: 'image9',  description: 'Omelette paratha', category: 'breads' },
  { id: 'beef-burger',     name: 'Beef Burger',     price: '550', image: 'image10', description: 'Beef patty burger with fries', category: 'fastfood' },
  { id: 'chicken-burger',  name: 'Chicken Burger',  price: '450', image: 'image11', description: 'Grilled chicken burger', category: 'fastfood' },
  { id: 'kabuli-pulao',    name: 'Kabuli Pulao',    price: '450', image: 'image12', description: 'Kabuli pulao with carrots and raisins', category: 'rice' },
  { id: 'veg-pizza',       name: 'Veg Pizza',       price: '900', image: 'image13', description: 'Vegetable pizza', category: 'fastfood' },
  { id: 'raita',           name: 'Raita',           price: '80',  image: 'image14', description: 'Mint raita', category: 'healthy' },
  { id: 'mix-salad',       name: 'Mix Salad',       price: '250', image: 'image15', description: 'Mixed vegetable salad', category: 'healthy' },
  { id: 'zinger-burger',   name: 'Zinger Burger',   price: '500', image: 'image16', description: 'Crispy zinger burger', category: 'fastfood' },
];

// Add-ons shown on the product detail and cart screens (category: drink | side).
// Same list the app falls back to, so there is one source of truth.
const extras = require('../src/data/extras.json');

(async () => {
  const batch = admin.firestore().batch();
  foodList.forEach(({ id, ...item }) => {
    batch.set(admin.firestore().collection('foodList').doc(id), { ...item, shop: SHOP });
  });
  extras.forEach(({ id, ...item }, index) => {
    batch.set(admin.firestore().collection('extras').doc(id), { ...item, order: index });
  });
  await batch.commit();
  console.log(`Added ${foodList.length} items to foodList and ${extras.length} items to extras`);
})().catch((e) => {
  console.error('Seed failed:', e.message);
  process.exit(1);
});
