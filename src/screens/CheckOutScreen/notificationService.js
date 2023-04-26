const sendSingleDeviceNotification = (data) => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "key=AAAAFsnAUN0:APA91bH1mlNZEmGbWkdZ_Z-QUB07wLwF9UpTNBVSoHtb2p5yTgEX6JtZGyShWJ-pWTmStgpOynU8uZpaorN684oLCrOLU9LoyJST6IAdPsUb4AWd5QndflYRcm2PeYXWSr6wX0tRgY6F");
// icon: 'https://icons8.com/icon/qbVfS5PPMXoa/anime-digital-network',
// icon: 'https://icons8.com/icon/13682/cloudflare',
var raw = JSON.stringify({
  "data": {},
  "notification": {
    "title": data.title,
    "body": data.body,
  },
  // "notification_key_name": "1",
  to: data.token,
  // registration_ids: [data.token],
});
console.log('checkraw',raw)

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
export default {sendSingleDeviceNotification}