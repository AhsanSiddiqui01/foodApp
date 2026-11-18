import { themedPills } from '../theme';
// Menu categories shown as chips above "Today's Menu"
export const CATEGORIES = themedPills([
  { key: 'all', label: 'All', emoji: '🍽️', color: '#1458C4', background: '#E8F0FD' },
  { key: 'rice', label: 'Rice', emoji: '🍛', color: '#E8590C', background: '#FFF1E6' },
  { key: 'fastfood', label: 'Fast Food', emoji: '🍔', color: '#E5484D', background: '#FDECEC' },
  { key: 'breads', label: 'Breads', emoji: '🍞', color: '#B26A00', background: '#FFF8E1' },
  { key: 'healthy', label: 'Salads & Sides', emoji: '🥗', color: '#2E9E5B', background: '#E7F6EC' },
]);

// Fallback for menu items saved before they had a `category` field
const KEYWORDS = [
  { key: 'rice', words: ['biryani', 'pulao', 'chawal', 'rice'] },
  { key: 'fastfood', words: ['burger', 'pizza', 'zinger', 'fries', 'sandwich'] },
  { key: 'breads', words: ['naan', 'roti', 'paratha', 'bread'] },
  { key: 'healthy', words: ['salad', 'raita'] },
];

export const categoryOf = (item) => {
  if (item.category) {
    return item.category;
  }
  const name = (item.name || '').toLowerCase();
  const match = KEYWORDS.find(({ words }) => words.some((word) => name.includes(word)));
  return match ? match.key : 'other';
};
