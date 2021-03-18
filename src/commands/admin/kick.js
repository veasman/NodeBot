module.exports = {
  commands: "kick",
  expectedArgs: "[user]",
  permissionError: "Admin perms are required to run this command",
  minArgs: 1,
  maxArgs: 1,
  description: "Kick a user",
  callback: (message, arguments, text) => {
    const { mentions } = message;

    const tag = arguments[0];
    const member = mentions.members.first();

    if (!member) {
      message.channel.send(`${tag} is not a valid user`)
      return;
    }

    if (!member.kickable) {
      message.channel.send(`${tag} can not be kicked`)
      return;
    }

    member.kick();
    message.channel.send(`${tag} was kicked from the server`)
  },
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
};