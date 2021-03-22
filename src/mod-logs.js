const roles = ["Moderator"];

module.exports = (client) => {
  const channelId = "823209692452749342";

  client.on("message", (message) => {
    const { guild, content, member } = message;

    if (member.user.bot) {
      return;
    }

    const hasRole = member.roles.cache.find((role) => {
      return roles.includes(role.name);
    });

    if (hasRole) {
      const channel = guild.channels.cache.get(channelId);
      channel.send(`<@${member.id}> sent message: 
      
      ${content}`);
    }
  });
}