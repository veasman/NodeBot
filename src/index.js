const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("../config.json");
const firstMessage = require("../first-message");
const command = require("./command");
const privateMessage = require("./private-message");

client.on("ready", () => {
  console.log("Client is ready");

  //firstMessage(client, "821207245676085298", "hello world", ["😳"]);
  privateMessage(client, "ping", "pong");
  /*command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      );
    });
  });
  command(client, ["cc", "clearchannel"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  });*/
});

client.login(config.token);
