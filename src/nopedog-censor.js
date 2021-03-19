const sendMessage = require("./send-message");

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.author.id === "821479799540940840") {
      return;
    }

    if (
      message.author.id === "402269568443219978" &&
      message.channel.id === "821500891403255808"
    ) {
      message.delete();
      sendMessage(
        message.channel,
        `${message.author} You must be 18 to post here!`,
        10
      );
    }
  });
};

