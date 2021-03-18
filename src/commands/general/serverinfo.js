module.exports = {
  commands: "serverinfo",
  expectedArgs: "",
  permissionError: "",
  minArgs: 0,
  maxArgs: 0,
  desription: "View the server's information",
  callback: (message, arguments, text) => {
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
  },
  permissions: [],
  requiredRoles: [],
};