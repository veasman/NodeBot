module.exports = {
  commands: "purge",
  expectedArgs: "",
  permissionError: "Admin perms are required to run this command",
  minArgs: 0,
  maxArgs: 0,
  description: "Clear messages from a channel",
  callback: (message, arguments, text) => {
    message.channel.messages.fetch().then((results) => {
      message.channel.bulkDelete(results);
    });
  },
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
};
