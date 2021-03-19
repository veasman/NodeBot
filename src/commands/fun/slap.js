module.exports = {
  commands: "slap",
  expectedArgs: "[user]",
  permissionError: "Admin perms are required to run this command",
  minArgs: 1,
  maxArgs: 1,
  description: "Slap a user",
  callback: (message, arguments, text) => {
    const { mentions } = message;

    const tag = arguments[0];
    const member = mentions.members.first();

    if (!member) {
      message.channel.send(`${tag} is not a valid user`)
      return;
    }

    if (!member.kickable) {
      const randomNum = Math.round(Math.random());
      const slapMessage = randomNum === 1 ?
        `${tag}, you have been slapped!` :
        `You tried to slap ${tag}, but they were too powerful... ${tag} slaps you back!`
      message.channel.send(slapMessage);
      return;
    }

    message.channel.send(`${tag}, you have been slapped!`)
  },
  permissions: ["ADMINISTRATOR"],
};