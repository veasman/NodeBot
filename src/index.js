const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("../config.json");
const firstMessage = require("./first-message");
const command = require("./command");
const privateMessage = require("./private-message");

client.on("ready", () => {
  console.log("Client is ready");

  command(client, "info", (message) => {
    const logo = "https://imgur.com/a/fxUvnB9";

    const embed = new Discord.MessageEmbed()
    .setTitle("My Github")
    .setURL("https://github.com/veasman/NodeBot")
    .setAuthor("NodeBot")
    .setThumbnail(logo)
    //.setImage(logo)
    .setFooter("This is a footer", logo)
    .setColor("#d79921")
    .addFields({
      name: "Version",
      value: "1.0",
      inline: true,
    },
    {
      name: "Version",
      value: "1.0",
      inline: true,
    })

    message.channel.send(embed);
  })

  command(client, "embed", (message) => {
    const content = message.content.replace('!embed ', '');
    const embed = new Discord.MessageEmbed()
    .setTitle("Embeded Message")
    .setURL(content)
    .setAuthor(message.author.username);

    message.channel.send(embed);
  })

  // Create a channel
  /*command(clinet, 'createchannel', (message) => {
    const name = message.content.replace('!createchannel ', '');

    message.guild.channel
    .create(name, {
      type: 'text',
    })
    .then((channel) => {
      console.log(channel)
    })
  })*/

  // Create a message on bot startup
  //firstMessage(client, "821207245676085298", "hello world", ["😳"]);
  
  // Private message a user when a string is said
  //privateMessage(client, "ping", "pong");

  // Get number of people in current server
  /*command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      );
    });
  });*/

  // Purge messages
  /*command(client, ["purge", "clear"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  });*/
});

client.login(config.token);
