module.exports = (client) => {
  const channelId = "821478926299430945"; // Welcome channel
  const rulesChannelId = "821481273075433532";

  client.on("guildmemberadd", (member) => {
    const message = `Welcome <@${
      member.id
    }> to the server! Please check out ${member.guild.channels.cache
      .get(rulesChannelId)
      .toString()}`;

    const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  });
};
