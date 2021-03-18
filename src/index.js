const Discord = require("discord.js");
const client = new Discord.Client();

const welcome = require("./welcome");
//const roleClaim = require("./role-claim");
const antiAd = require("./anti-ad");
const censorship = require("./censorship");
const inviteNotifications = require("./invite-notifications");

const mongo = require("./mongo");
const config = require("../config.json");
const loadCommands = require("./commands/load-commands");

client.on("ready", async () => {
  console.log("Client is ready");
  
  // Initialize commands
  loadCommands(client);

  // Initialize other functions
  antiAd(client)
  //roleClaim(client);
  welcome(client);
  censorship(client);
  inviteNotifications(client);
});

client.login(config.token);