const Discord = require("discord.js");

const mongo = require("../../mongo");
const profileSchema = require("../../schemas/profile-schema");

const getLevel = async (guildId, userId, message) => {};

module.exports = {
  commands: "rank",
  expectedArgs: "",
  minArgs: 0,
  maxArgs: 0,
  description: "Check your level",
  requiredChannel: "𝖗𝖆𝖓𝖐-𝖉𝖎𝖘𝖕𝖑𝖆𝖞",
  callback: async (message, arguments, text) => {
    const { guild, member } = message;
    const guildId = guild.id;
    const userId = member.id;

    let level = 0;
    let xp = 0;

    //const userLevel = getLevel(guild.id, member.id, message);
    //message.channel.send(`${userLevel}`);

    await mongo().then(async (mongoose) => {
      try {
        const result = await profileSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
          }
        );
        level = result.level;
        xp = result.xp;
      } finally {
        mongoose.connection.close();
      }
    });
    let requiredXP = level * 150;
    const embed = new Discord.MessageEmbed()
      .setTitle(`${member.displayName}'s rank`)
      .setColor(0xfa5ffa)
      .addFields(
        {
          name: `Level`,
          value: `${level}`,
          inline: true,
        },
        {
          name: "XP",
          value: `${xp}/${requiredXP}`,
          inline: true,
        }
      );

    message.channel.send(embed);
  },
};

