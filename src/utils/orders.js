import firestore from '@react-native-firebase/firestore';
import { isAdmin as isOwner } from './roles';

// Orders between range.start and range.end (by server createdAt), newest first. Only that
// slice is downloaded, so the lists stay fast however much history builds up.
//   { userId }  -> one customer's orders (index: orderDetail.userId + createdAt)
//   { adminId } -> orders of the customers assigned to that admin (index: adminId + createdAt)
//   {}          -> everything (owner)
export const ordersInRange = (range, { userId, adminId } = {}) => {
  let query = firestore().collection('orderList');
  if (userId) {
    query = query.where('orderDetail.userId', '==', userId);
  }
  if (adminId) {
    query = query.where('adminId', '==', adminId);
  }
  return query
    .where('createdAt', '>=', firestore.Timestamp.fromDate(range.start))
    .where('createdAt', '<', firestore.Timestamp.fromDate(range.end))
    .orderBy('createdAt', 'desc');
};

// What a staff member may see: the owner sees every order, an admin only their customers'
export const staffOrderFilter = (apcontrol, uid) => (isOwner(apcontrol) ? {} : { adminId: uid });

// Flattens an orderList document into what the order cards use
export const toOrder = (doc) => {
  const data = doc.data();
  const { time, date, userId, userName, userOrder } = data.orderDetail || {};
  return {
    id: doc.id,
    time,
    date,
    userName,
    userId,
    userOrder: userOrder || [],
    createdAt: data.createdAt ? data.createdAt.toMillis() : 0,
    status: data.status || 'placed',
    adminId: data.adminId || null,
    adminName: data.adminName || null,
    cancelReason: data.cancelReason || null,
    cancelledBy: data.cancelledBy || null,
  };
};

// Admin / owner cancels an order with a reason the customer will see
export const cancelOrder = (orderId, { reason, cancelledBy }) =>
  firestore().collection('orderList').doc(orderId).update({
    status: 'cancelled',
    cancelReason: reason.trim(),
    cancelledBy: cancelledBy || null,
    statusUpdatedAt: firestore.FieldValue.serverTimestamp(),
  });

// Cancelled orders don't count towards totals (kitchen summary, revenue)
export const activeOrders = (orders) => orders.filter((order) => order.status !== 'cancelled');

export const isMissingIndex = (error) => error && error.code === 'firestore/failed-precondition';
