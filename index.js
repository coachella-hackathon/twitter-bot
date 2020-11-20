const { Autohook } = require("twitter-autohook");
const axios = require("axios");
const { config } = require("./config");
const { sayHi, respondFollower } = require("./message-response");
const {privateKey} = require("./privateKey")
var admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert(privateKey),
  databaseURL: "https://codechella-f4261.firebaseio.com"
});
const db = admin.firestore();

const updateDBWithUserInfo = (userHandle, userData) => {
  const userRef = db.collection('users').doc(userHandle);
  userRef.set({
    handle: '@Hello',
    first: 'Lovelace',
    last: testProps.lastName,
    followers: '10',
    tweetList: [{
      tweetId: "10",
      tweetContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
      likes: '2',
      retweets: "3",
      comments: "4",
      creation: "date/time",
      tweetOwner: "@Hello",
      owner: "true"
    }],
  
  });
  
}

const testProps  = {
  lastName: "hello2"
}
updateDBWithUserInfo('@TestUser', testProps)


const onFollow = (webhook) => {
  webhook.on("event", async (event) => {
    if (event.follow_events) {
      // console.log("Something happened:", event);
      // console.log(event.follow_events[0].target, event.follow_events[0].source);
      await respondFollower(event);
    }
    if (event.direct_message_events) {
      console.log("Person said hi");
      await sayHi(event);
    }
  });
};

(async (ƛ) => {
  const webhook = new Autohook({ ...config });

  try {
    // Removes existing webhooks
    await webhook.removeWebhooks();

    // Listens to incoming activity
    await onFollow(webhook);

    // Starts a server and adds a new webhook
    await webhook.start();

    // Subscribes to a user's activity
    await webhook.subscribe({
      oauth_token: "905477697744232449-LFZg8uw520bVpFrTi3wrSXJ1KAnGXVw",
      oauth_token_secret: "qtpuD53OqaumJxuKnh5xb44R9GcS5OvDt5nqC7gl808jC",
    });
  } catch (e) {
    console.log(e);
  }
})();
