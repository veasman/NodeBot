const sendMessage = require("../../send-message");

const channelId = "822108577983889408";
const check = "✅";
let registered = false;

const registerEvent = (client) => {
  if (registered) {
    return;
  }

  registered = true;

  console.log("REGISTERING EVENTS");

  client.on("messageReactionAdd", (reaction, user) => {
    if (user.bot) {
      return;
    }

    console.log("HANDLING REACTION");
    const { message } = reaction;
    if (message.channel.id === channelId) {
      message.delete();
    }
  });
};

module.exports = {
  commands: ["ticket", "support"],
  minArgs: 1,
  expectedArgs: "[message]",
  callback: (userMessage, arguments, text, client) => {
    const { guild, member } = userMessage;

    registerEvent(client);

    const channel = guild.channels.cache.get(channelId);
    channel
      .send(
        `A new ticket has been created by <@${member.id}>

    "${text}"

    Click the ${check} when this issue has been resolved`
      )
      .then((ticketMessage) => {
        ticketMessage.react(check);

        sendMessage(
          userMessage.channel,
          `${userMessage.author} Your ticket has been sent!`,
          10
        );
        //userMessage.reply("Your ticket has been sent");
        userMessage.delete();
      });
  },
};

