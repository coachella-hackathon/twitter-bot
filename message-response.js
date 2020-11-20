const axios = require("axios");

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
  const senderScreenName =
    event.users[message.message_create.sender_id].screen_name;

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
            text: `Hi @${senderScreenName}! 👋`,
          },
        },
      },
    },
  };
  await axios.post(requestConfig);
};
