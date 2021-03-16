const Discord = require("discord.js");
const client = new Discord.Client();

const command = require("./command-handler");
const welcome = require("./welcome");
//const roleClaim = require("./role-claim");
const sendMessage = require("./send-message");
const censorship = require("./censorship");
const firstMessage = require("./first-message");
const privateMessage = require("./private-message");

const config = require("../config.json");

client.on("ready", () => {
  console.log("Client is ready");

  //roleClaim(client);
  welcome(client);
  censorship(client, (message) => {});

  const guild = client.guilds.cache.get("821478925711441970");
  const channel = guild.channels.cache.get("821479291380039742");

  command(client, "help", (message) => {
    message.channel.send(`
        !help - Displays the help menu
        `);
    const { prefix } = config;
    client.user.setPresence({
      activity: {
        name: `Use ${prefix}help for help`,
      },
    });
  });

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

  command(client, "info", (message) => {
    const logo =
      "https://media.discordapp.net/attachments/821480304903716917/821481145925107762/a25dbe82f9f071d765d3b6a778ea9c47.jpg";

    const embed = new Discord.MessageEmbed()
      //.setTitle("My Github")
      //.setURL("https://github.com/veasman/NodeBot")
      .setAuthor("YSLBot")
      //.setThumbnail(logo)
      //.setImage(logo)
      //.setFooter(`Run "${prefix}help" for help`, logo)
      .setColor(0xfa5ffa)
      .addFields({
        name: "Version",
        value: "1.0",
        inline: true,
      });

    message.channel.send(embed);
  });

  command(client, "embed", (message) => {
    const content = message.content.replace("!embed ", "");
    const embed = new Discord.MessageEmbed()
      .setTitle("Embeded Message")
      .setURL(content)
      .setAuthor(message.author.username);

    message.channel.send(embed);
  });

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

  // Private message a user when a string is said
  //privateMessage(client, "ping", "pong");

  // Purge messages
  command(client, ["purge", "clear"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  });
});

client.login(config.token);
