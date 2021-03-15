const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("../config.json");
const command = require("./command");

client.on("ready", () => {
  console.log("Client is ready");

  command(client, "ping", (message) => {
    message.channel.send("pong");
  });
});

client.login(config.token);
