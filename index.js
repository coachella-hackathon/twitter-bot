const { Autohook } = require("twitter-autohook");
const config = {

};

const onFollow = (webhook) => {
  webhook.on("event", (event) => {
    if(event.follow_events){
      console.log("Something happened:", event);
    }    
    if(event.direct_message_events) {
      console.log("Person said hi");
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
