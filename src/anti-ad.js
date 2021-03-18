module.exports = (client) => {
  const isInvite = async (guild, code) => {
    return await new Promise(resolve => {
      guild.fetchInvites().then((invites) => {
        for (const invite of invites) {
          if (code === invite[0]) {
            resolve(true);
            return;
          }
        }

        resolve(false);
      })
    })
  }
  client.on("message", async (message) => {
    const { guild, member, content } = message;

    const code = content.split("discord.gg/")[1];
    
    if (content.includes("discord.gg/")) {
      const isLocalInvite = await isInvite(guild, code);

      if (!isLocalInvite) {
        message.delete()
        message.channel.send(`${message.author} please do not advertise other discord servers`)
      }
    }
  })
}