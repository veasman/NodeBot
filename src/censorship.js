module.exports = (client, callback) => {
  client.on("message", (message) => {
    if (message.author === "821479799540940840") {
      return;
    }
    const { content } = message;

    if (content.toLowerCase().includes("nigger")) {
      message.delete();
      message.channel.send(`${message.author} dont say that!`);
    }
  });
};
