const { Autohook } = require("twitter-autohook");
const axios = require('axios')
const config = {
  token: "905477697744232449-LFZg8uw520bVpFrTi3wrSXJ1KAnGXVw",
  token_secret: "qtpuD53OqaumJxuKnh5xb44R9GcS5OvDt5nqC7gl808jC",
  consumer_key: "zTu449DUl7MyUIkcUcgTxV7cN",
  consumer_secret: "WiTEqsSJwex7OhbPC0d388FHo4DGAD9PijAZo44p74zQzw5I36",
  ngrok_secret: "1W4xw0SNiXqdUA9x70LNzMGsvyM_3eLPv6GDQH9zkZrJxmdh8",
  env: "dev",
  port: 3000,
};

const sayHi =  async (event) => {
  // This is broken
   // We check that the message is a direct message
   if (!event.direct_message_events) {
    return;
  }

  // Messages are wrapped in an array, so we'll extract the first element
  const message = event.direct_message_events.shift();

  // We check that the message is valid
  if (typeof message === 'undefined' || typeof message.message_create === 'undefined') {
    return;
  }
 
  // We filter out message you send, to avoid an infinite loop
  if (message.message_create.sender_id === message.message_create.target.recipient_id) {
    return;
  }

    // Prepare and send the message reply
    const senderScreenName = event.users[message.message_create.sender_id].screen_name;

    const requestConfig = {
      url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
      oauth: oAuthConfig,
      json: {
        event: {
          type: 'message_create',
          message_create: {
            target: {
              recipient_id: message.message_create.sender_id,
            },
            message_data: {
              text: `Hi @${senderScreenName}! 👋`,
            },
          },
        },
      },
    };
    await axios.post(requestConfig);
}

const onFollow = (webhook) => {
  webhook.on("event", (event) => {
    if(event.follow_events){
      console.log("Something happened:", event);
    }    
    if(event.direct_message_events) {
      console.log("Person said hi");
      await sayHi(event);
    }
  });
}

(async (ƛ) => {
  const webhook = new Autohook({ ...config });

  try {
    // Removes existing webhooks
    await webhook.removeWebhooks();

    // Listens to incoming activity
    onFollow(webhook);

    // Starts a server and adds a new webhook
    await webhook.start();

    // Subscribes to a user's activity
    await webhook.subscribe({ oauth_token: "905477697744232449-LFZg8uw520bVpFrTi3wrSXJ1KAnGXVw"
    , oauth_token_secret:"qtpuD53OqaumJxuKnh5xb44R9GcS5OvDt5nqC7gl808jC" });
  } catch (e) {
    console.log(e);
  }
})();
