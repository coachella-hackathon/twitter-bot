const axios = require("axios");
const util = require("util");
const request = require("request");
const post = util.promisify(request.post);

const oAuthConfig = {
  consumer_key: "zTu449DUl7MyUIkcUcgTxV7cN",
  consumer_secret: "WiTEqsSJwex7OhbPC0d388FHo4DGAD9PijAZo44p74zQzw5I36",
  token: "905477697744232449-LFZg8uw520bVpFrTi3wrSXJ1KAnGXVw",
  token_secret: "qtpuD53OqaumJxuKnh5xb44R9GcS5OvDt5nqC7gl808jC",
};

const sayHi = async (event) => {
  // This is broken
  // We check that the message is a direct message
  if (!event.direct_message_events) {
    return;
  }

  // Messages are wrapped in an array, so we'll extract the first element
  const message = event.direct_message_events.shift();

  // We check that the message is valid
  if (
    typeof message === "undefined" ||
    typeof message.message_create === "undefined"
  ) {
    return;
  }

  // We filter out message you send, to avoid an infinite loop
  if (
    message.message_create.sender_id ===
    message.message_create.target.recipient_id
  ) {
    return;
  }

  // Prepare and send the message reply
  const senderScreenName = event.users[message.message_create.sender_id].name;

  let textMessage = `Hi @${senderScreenName}! 👋🏻`;

  if (
    message.message_create.message_data.text
      .toLowerCase()
      .includes("motivation") ||
    message.message_create.message_data.text.toLowerCase().includes("1")
  ) {
    textMessage = "Search for cute dog videos";
    console.log(message.message_create);
  } else if (
    message.message_create.message_data.text.toLowerCase().includes("friend") ||
    message.message_create.message_data.text.toLowerCase().includes("2")
  ) {
    textMessage = "I am your friend :)";
  }

  const requestConfig = {
    url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
    oauth: oAuthConfig,
    json: {
      event: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id: message.message_create.sender_id,
          },
          message_data: {
            text: textMessage,
          },
        },
      },
    },
  };

  const response = await post(requestConfig);
  //console.log(response);
};

const respondFollower = async (event) => {
  // This is broken
  // We check that the message is a direct message

  //console.log("Bruh Moment", event.follow_events[0].source.id);
  // Messages are wrapped in an array, so we'll extract the first element
  const message = event.follow_events.type;

  // Prepare and send the message reply
  const senderScreenName = event.follow_events[0].source.name;

  let textMessage = `Hi @${senderScreenName}! 👋 \n We have specially curated #HowAreYouTweening2020 for you! Thank you for being with us for the year, and we're excited to many more yearss ahead!`;

  let requestConfig = {
    url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
    oauth: oAuthConfig,
    json: {
      event: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id: event.follow_events[0].source.id,
          },
          message_data: {
            text: textMessage,
          },
        },
      },
    },
  };

  let response = await post(requestConfig);
  textMessage =
    "We know that this has been a tough year! :( We are here to support! \n Reply one of the following to ... \n 1. Get Motivated \n 2. Meet meaningful people \n 3. xxxx";

  requestConfig = {
    url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
    oauth: oAuthConfig,
    json: {
      event: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id: event.follow_events[0].source.id,
          },
          message_data: {
            text: textMessage,
          },
        },
      },
    },
  };
  response = await post(requestConfig);
  //console.log(response.body);
};

module.exports = {
  sayHi,
  respondFollower,
};
