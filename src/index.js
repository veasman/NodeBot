const Discord = require("discord.js");
const client = new Discord.Client();

const command = require("./command-handler");
const welcome = require("./welcome");
//const roleClaim = require("./role-claim");
const antiAd = require("./anti-ad");
const censorship = require("./censorship");

const mongo = require("./mongo");
const config = require("../config.json");
const loadCommands = require("./commands/load-commands");

client.on("ready", async () => {
  console.log("Client is ready");

  antiAd(client)
  //roleClaim(client);
  welcome(client);
  censorship(client);

  loadCommands(client);
});

client.login(config.token);
