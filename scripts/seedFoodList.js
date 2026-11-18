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

// image = key from src/assets/images (foodImages); prices are placeholders, edit them in the console
const SHOP = 'Foody Kitchen';
const foodList = [
  { id: 'daal-chawal',     name: 'Daal Chawal',     price: '250', image: 'image1',  description: 'Yellow daal with plain rice' },
  { id: 'chicken-pulao',   name: 'Chicken Pulao',   price: '350', image: 'image2',  description: 'Chicken yakhni pulao with raita' },
  { id: 'chicken-biryani', name: 'Chicken Biryani', price: '350', image: 'image3',  description: 'Spicy chicken biryani' },
  { id: 'green-salad',     name: 'Green Salad',     price: '150', image: 'image4',  description: 'Fresh green salad' },
  { id: 'naan',            name: 'Naan',            price: '30',  image: 'image5',  description: 'Tandoori naan' },
  { id: 'roti',            name: 'Roti',            price: '20',  image: 'image6',  description: 'Fresh chapati' },
  { id: 'beef-pulao',      name: 'Beef Pulao',      price: '400', image: 'image7',  description: 'Beef yakhni pulao' },
  { id: 'beef-biryani',    name: 'Beef Biryani',    price: '400', image: 'image8',  description: 'Spicy beef biryani' },
  { id: 'anda-paratha',    name: 'Anda Paratha',    price: '200', image: 'image9',  description: 'Omelette paratha' },
  { id: 'beef-burger',     name: 'Beef Burger',     price: '550', image: 'image10', description: 'Beef patty burger with fries' },
  { id: 'chicken-burger',  name: 'Chicken Burger',  price: '450', image: 'image11', description: 'Grilled chicken burger' },
  { id: 'kabuli-pulao',    name: 'Kabuli Pulao',    price: '450', image: 'image12', description: 'Kabuli pulao with carrots and raisins' },
  { id: 'veg-pizza',       name: 'Veg Pizza',       price: '900', image: 'image13', description: 'Vegetable pizza' },
  { id: 'raita',           name: 'Raita',           price: '80',  image: 'image14', description: 'Mint raita' },
  { id: 'mix-salad',       name: 'Mix Salad',       price: '250', image: 'image15', description: 'Mixed vegetable salad' },
  { id: 'zinger-burger',   name: 'Zinger Burger',   price: '500', image: 'image16', description: 'Crispy zinger burger' },
];

// Add-ons shown on the product detail screen (category: drink | side)
const extras = [
  { id: 'coca-cola',     name: 'Coca-Cola',     price: '120', image: 'drink-cola',   category: 'drink' },
  { id: 'pepsi',         name: 'Pepsi',         price: '120', image: 'drink-pepsi',  category: 'drink' },
  { id: 'sprite',        name: 'Sprite',        price: '120', image: 'drink-sprite', category: 'drink' },
  { id: '7up',           name: '7UP',           price: '120', image: 'drink-7up',    category: 'drink' },
  { id: 'fanta',         name: 'Fanta',         price: '120', image: 'drink-fanta',  category: 'drink' },
  { id: 'mineral-water', name: 'Mineral Water', price: '80',  image: 'drink-water',  category: 'drink' },
  { id: 'extra-raita',   name: 'Raita',         price: '80',  image: 'image14',      category: 'side' },
  { id: 'extra-salad',   name: 'Green Salad',   price: '150', image: 'image4',       category: 'side' },
  { id: 'extra-naan',    name: 'Naan',          price: '30',  image: 'image5',       category: 'side' },
  { id: 'extra-roti',    name: 'Roti',          price: '20',  image: 'image6',       category: 'side' },
];

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
