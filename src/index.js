const Discord = require("discord.js");
const client = new Discord.Client();

const loadCommands = require("./commands/load-commands");
const welcome = require("./welcome");
//const roleClaim = require("./role-claim");
const antiAd = require("./anti-ad");
const censorship = require("./censorship");
const inviteNotifications = require("./invite-notifications");
const scalingChannels = require("./scaling-channels");
const levels = require("./levels");

const config = require("../config.json");

client.on("ready", async () => {
  // Initialize commands
  loadCommands(client);

  // Initialize other functions
  antiAd(client);
  //roleClaim(client);
  welcome(client);
  censorship(client);
  inviteNotifications(client);
  //scalingChannels(client);
  levels(client);
});

client.login(config.token);
