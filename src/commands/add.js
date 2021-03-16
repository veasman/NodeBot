module.exports = {
  commands: ["add", "addition"],
  expectedArgs: "<num1> <num2>",
  permissionError: "Admin perms are required to run this command",
  minArgs: 2,
  maxArgs: 2,
  callback: (message, arguments, text) => {},
};
