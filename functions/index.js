// Cloud Functions for foody.
// notifyAdminsOnNewOrder: when a user places an order, push a notification to every admin device.
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

admin.initializeApp();

// FCM errors that mean the token is dead and should be removed
const STALE_TOKEN_ERRORS = [
  'messaging/registration-token-not-registered',
  'messaging/invalid-registration-token',
  'messaging/invalid-argument',
];

const describeItems = (items) => {
  const parts = items.map((food) => `${Number(food.QTY) || 1}x ${food.name}`);
  const text = parts.slice(0, 3).join(', ');
  return parts.length > 3 ? `${text} +${parts.length - 3} more` : text;
};

exports.notifyAdminsOnNewOrder = functions.firestore
  .document('orderList/{orderId}')
  .onCreate(async (snapshot, context) => {
    const order = snapshot.data().orderDetail || {};
    const items = order.userOrder || [];
    const total = items.reduce(
      (sum, food) => sum + Number(food.price || 0) * (Number(food.QTY) || 1),
      0,
    );

    // Only the customer's assigned admin and the owner(s) hear about it
    const assignedAdmin = snapshot.data().adminId || null;
    const allTokenDocs = await admin.firestore().collection('adminToken').get();
    const tokenDocs = {
      docs: allTokenDocs.docs.filter((doc) => {
        const { uid, apcontrol } = doc.data();
        return Number(apcontrol) === 2 || (assignedAdmin && uid === assignedAdmin);
      }),
    };
    const tokens = [...new Set(tokenDocs.docs.map((doc) => doc.data().token).filter(Boolean))];
    if (tokens.length === 0) {
      functions.logger.info('No admin devices registered; skipping notification');
      return;
    }

    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: `🍽️ New order from ${order.userName || 'a customer'}`,
        body: `${describeItems(items)} · Rs ${total}`,
      },
      data: { orderId: context.params.orderId },
      android: {
        priority: 'high',
        notification: { channelId: 'orders', sound: 'default' },
      },
    });
    functions.logger.info(`Order ${context.params.orderId}: sent ${response.successCount}/${tokens.length}`);

    // Clean up tokens of uninstalled apps / signed-out devices
    const stale = tokens.filter((token, index) => {
      const error = response.responses[index].error;
      return error && STALE_TOKEN_ERRORS.includes(error.code);
    });
    await Promise.all(
      tokenDocs.docs
        .filter((doc) => stale.includes(doc.data().token))
        .map((doc) => doc.ref.delete()),
    );
  });
