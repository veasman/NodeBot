module.exports = {
  commands: "kick",
  expectedArgs: "<user>",
  permissionError: "Admin perms are required to run this command",
  minArgs: 1,
  maxArgs: 1,
  callback: (message, arguments, text) => {
    const tag = +arguments[0]
    const target = message.guild.cache.get(tag)

    if (target) {
      target.kick();
      message.channel.send(`${tag} has been kicked`)
    } else {
      message.channel.send("Please specity a user to kick");
    }
  },
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
};