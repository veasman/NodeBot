const path = require("path")
const fs = require("fs")
const Discord = require("discord.js");
const client = new Discord.Client();

const command = require("./command-handler");
const welcome = require("./welcome");
//const roleClaim = require("./role-claim");
const censorship = require("./censorship");
//const sendMessage = require("./send-message");
//const firstMessage = require("./first-message");
//const privateMessage = require("./private-message");

const config = require("../config.json");

client.on("ready", () => {
  console.log("Client is ready");

  const baseFile = "command-base.js"
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands("commands")

  command(client, "serverinfo", (message) => {
    const { guild } = message;

    const { name, region, memberCount, owner, createdAt } = guild;

    const icon = guild.iconURL();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for ${name}`)
      .setThumbnail(icon)
      .setColor(0xfa5ffa)
      .addFields(
        {
          name: "Region",
          value: region,
          inline: true,
        },
        {
          name: "Members",
          value: memberCount,
          inline: true,
        },
        {
          name: "Created On",
          value: createdAt,
        }
      );

    message.channel.send(embed);
  });

  // Purge messages
  command(client, ["purge", "clear"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  });

  //roleClaim(client);
  welcome(client);
  censorship(client);
});

client.login(config.token);
