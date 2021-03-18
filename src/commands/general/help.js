const Discord = require("discord.js");

const loadCommands = require("../load-commands")
const { prefix } = require("../../../config.json")

module.exports = {
  commands: ["help", "h"],
  description: "Describes all of this bot's commands",
  callback: (message, arguments, text) => {
    let reply = "I am the tutorial bot, here are my supported commands:\n\n"

    const commands = loadCommands()

    const embed = new Discord.MessageEmbed()
      .setTitle("YSL Bot Commands")
      .setColor(0xfa5ffa)

    for (const command of commands) {
      // Check for permissions
      let permissions = command.permission

      // Times we have looped
      let loopNum = 0;

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === "string") {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === "string"
          ? command.commands
          : command.commands[0]
      const args = command.expectedArgs ? ` ${command.expectedArgs}` : ""
      const { description } = command

      //reply += `**${prefix}${mainCommand}${args}** = ${description}\n`

      var isInline = loopNum % 2 === 0;

      embed.addFields(
          {
            name: `${prefix}${mainCommand} ${args}`,
            value: "`"+description+"`", // This is the best way to do this as far as I know
            inline: isInline,
          }
        );

      loopNum += 1
    }

    message.channel.send(embed);
  },
}