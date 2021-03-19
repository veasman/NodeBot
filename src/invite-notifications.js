// TODO: guildMemberAdd not working maybe?
module.exports = (client) => {
  const invites = {};

  const getInviteCounts = async (guild) => {
    return await new Promise((resolve) => {
      guild.fetchInvites().then((invites) => {
        const inviteCounter = {};

        invites.forEach((invite) => {
          const { uses, inviter } = invite;
          const { username, descriminator } = inviter;

          const name = `${username}#${descriminator}`;

          inviteCounter[name] = (inviteCounter[name] || 0) + uses;
        });

        resolve(inviteCounter);
      });
    });
  };

  client.guilds.cache.forEach(async (guild) => {
    invites[guild.id] = await getInviteCounts(guild);
  });

  client.on("guildMemberAdd", async (member) => {
    const { guild, id } = member;

    const invitesBefore = invites[guild.id];
    const invitesAfter = await getInviteCounts(guild);

    for (const inviter in invitesAfter) {
      if (invitesBefore[inviter] === invitesAfter[inviter] - 1) {
        const channelId = "822102032021979177";
        const channel = guild.channels.cache.get(channelId);
        const count = invitesAfter[inviter];
        channel.send(
          `<@${id}> has joined. Invited by ${inviter} (${count} invites)`
        );
        return;
      }
    }
  });
};

