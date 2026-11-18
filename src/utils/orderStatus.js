import { themedPills } from '../theme';
// Order lifecycle shared by the user's My Orders and the admin's Orders screen.
// Orders saved before statuses existed have no `status` field and count as "placed".
export const ORDER_STATUSES = themedPills([
  { key: 'placed', label: 'Placed', color: '#1458C4', background: '#E8F0FD', action: null },
  { key: 'preparing', label: 'Preparing', color: '#B26A00', background: '#FFF4E0', action: 'Mark as Preparing' },
  { key: 'ready', label: 'Ready', color: '#2E9E5B', background: '#E7F6EC', action: 'Mark as Ready' },
  { key: 'delivered', label: 'Delivered', color: '#666666', background: '#EEF1F6', action: 'Mark as Delivered' },
]);

// Off the normal path: an admin / the owner can cancel any order that isn't delivered yet
export const CANCELLED = themedPills([{ key: 'cancelled', label: 'Cancelled', color: '#E5484D', background: '#FDECEC', action: null }])[0];

// Quick reasons offered when cancelling (the admin can also type their own)
export const CANCEL_REASONS = [
  'Item not available',
  'Out of stock',
  'Kitchen is closed',
  'Delivery not possible',
];

export const isCancelled = (key) => key === CANCELLED.key;

export const statusIndex = (key) => {
  const index = ORDER_STATUSES.findIndex((status) => status.key === key);
  return index === -1 ? 0 : index;
};

export const getStatus = (key) => (isCancelled(key) ? CANCELLED : ORDER_STATUSES[statusIndex(key)]);

// The step that comes after `key`, or null once the order is delivered or cancelled
export const nextStatus = (key) => (isCancelled(key) ? null : ORDER_STATUSES[statusIndex(key) + 1] || null);

export const canCancel = (key) => !isCancelled(key) && key !== 'delivered';
