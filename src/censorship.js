const sendMessage = require("./send-message");

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.author === "821479799540940840") {
      return;
    }
    const { content } = message;

    if (content.toLowerCase().includes("nigger")) {
      message.delete();
      sendMessage(message.channel, `${message.author} dont say that!`, 10);
    }
  });
};
