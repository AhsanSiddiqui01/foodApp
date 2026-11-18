import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmModal from '../ConfirmModal';
import { ordersInRange, toOrder } from '../../../utils/orders';
import { presetRange } from '../../../utils/dateRange';
import { ROLES } from '../../../utils/roles';

// Customers only: while the app is open, watch today's orders and pop up a notice the moment
// the kitchen cancels one, with the reason they gave.
const OrderStatusWatcher = () => {
  const uid = useSelector((state) => state.GeneralReducer.id);
  const signedIn = useSelector((state) => !!state.GeneralReducer.access_token);
  const apcontrol = useSelector((state) => state.GeneralReducer.apcontrol);
  const [notice, setNotice] = useState(null);
  const lastStatus = useRef({});

  useEffect(() => {
    lastStatus.current = {};
    if (!signedIn || !uid || Number(apcontrol) !== ROLES.USER) {
      return undefined;
    }
    let firstSnapshot = true;
    return ordersInRange(presetRange('today'), { userId: uid }).onSnapshot((snapshot) => {
      snapshot.docs.map(toOrder).forEach((order) => {
        const before = lastStatus.current[order.id];
        // Ignore what is already cancelled when the app opens; only react to new cancellations
        if (!firstSnapshot && order.status === 'cancelled' && before && before !== 'cancelled') {
          setNotice({
            title: 'Order Cancelled',
            message: `Sorry, your order #${order.id.slice(0, 6).toUpperCase()} was cancelled by the kitchen.\n\nReason: ${order.cancelReason || 'Not given'}`,
          });
        }
        lastStatus.current[order.id] = order.status;
      });
      firstSnapshot = false;
    }, (error) => console.log('order status watch error', error));
  }, [signedIn, uid, apcontrol]);

  return (
    <ConfirmModal
      visible={!!notice}
      title={notice ? notice.title : ''}
      message={notice ? notice.message : ''}
      confirmText="OK"
      hideCancel
      onConfirm={() => setNotice(null)}
    />
  );
};

export default OrderStatusWatcher;
