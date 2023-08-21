"use strict";

var webpush = require("web-push");

var PUBLIC_VAPID_KEY = 'BPOresZEIXgmtFGU-uL55yRkmtjC9KA9yzu7JlidStsjvjNK-mIi_6dMIe43w6dBKxLu6dNW0l4UBnDbuBC4T-w';
var PRIVATE_VAPID_KEY = '7p7UbDmS40edrQy6-2aJCM2T97UDwgHZqkDvptljPGk';
webpush.setVapidDetails("mailto:wysweb.com", PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);
module.exports = webpush;