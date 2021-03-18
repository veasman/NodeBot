module.exports = {
  commands: "ban",
  expectedArgs: "[user]",
  permissionError: "Admin perms are required to run this command",
  minArgs: 1,
  maxArgs: 1,
  description: "Ban a user",
  callback: (message, arguments, text) => {
    const { mentions } = message;

    const tag = arguments[0];
    const member = mentions.members.first();

    if (!member) {
      message.channel.send(`${tag} is not a valid user`)
    }

    if (!member.kickable) {
      message.channel.send(`${tag} can not be banned`)
      return;
    }

    member.ban();
    message.channel.send(`${tag} was banned from the server`)
  },
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
};
