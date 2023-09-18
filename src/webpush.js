const webpush = require("web-push");
const  PUBLIC_VAPID_KEY = 'BPOresZEIXgmtFGU-uL55yRkmtjC9KA9yzu7JlidStsjvjNK-mIi_6dMIe43w6dBKxLu6dNW0l4UBnDbuBC4T-w'
const PRIVATE_VAPID_KEY = '7p7UbDmS40edrQy6-2aJCM2T97UDwgHZqkDvptljPGk'
webpush.setVapidDetails(
  "mailto:symtech.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

module.exports = webpush;