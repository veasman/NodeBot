const mongo = require("./mongo");
const profileSchema = require("./schemas/profile-schema");

module.exports = (client) => {
  client.on("message", (message) => {
    const { guild, member } = message;

    if (member.user.bot) {
      return;
    }

    const min = 10;
    const max = 30;
    let randomNum = Math.round(Math.random() * (max - min + 1)) + min;
    addXP(guild.id, member.id, randomNum, message);
  });
};

const getNeededXP = (level) => level * 150;

const addXP = async (guildId, userId, xpToAdd, message) => {
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
          $inc: {
            xp: xpToAdd,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      let { xp, level } = result;
      const needed = getNeededXP(level);

      if (xp >= needed) {
        ++level;
        xp -= needed;

        message.channel.send(
          `<@${userId}> you have leveled up to level ${level}`
        );

        await profileSchema.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        );
      }
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.addXP = addXP;