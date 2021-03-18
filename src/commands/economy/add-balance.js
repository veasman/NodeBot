const economy = require("../../economy")

module.exports = {
  commands: ["addbalance", "addbal"],
  minArgs: 2,
  minArgs: 2,
  expectedArgs: "[target] [coins]",
  permissionError: "You must be a merchant to use this command.",
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first();

    if (!mention) {
      message.reply("Please tag a user to give coins to");
      return;
    }

    const coins = arguments[1];
    if (isNaN(coins)) {
      message.reply("Please provide a valid number of coins");
      return;
    }

    const guildId = message.guild.id;
    const userId = mention.id;

    const newCoins = await economy.addCoins(guildId, userId, coins);

    message.reply(`You have give <@${userId}> ${coins} coin(s). They now have ${newCoins} coin(s)`)
  },
  requiredRoles: ["𝖒𝖊𝖗𝖈𝖍𝖆𝖓𝖙"]
}