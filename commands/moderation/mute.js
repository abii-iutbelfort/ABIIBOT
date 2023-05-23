const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const parse = require('parse-duration');


const data = new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to mute')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('The duration as 30m | 2h | 3d | 2w | 1y')
        .setMaxLength(5)
        .setMinLength(2))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for muting the user'))
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)

const execute = async (interaction) => {
  const author = interaction.user.nick ?? interaction.user.username;
  const member = interaction.options.getMember('user');
  const memberName = member.nick ?? member.user.username;
  let humanDuration = interaction.options.getString('duration') ?? '30m';
  try {
    const reason = interaction.options.getString('reason') ?? 'No reason specified';
    await member.timeout(parse(humanDuration), reason)
    await interaction.reply(`**${author}** a muté **${memberName}** pendant **${humanDuration}**\nRaison : \`${reason}\``);
  } catch (e) {
    console.error(e)
    interaction.reply("Invalid duration")
  }
}

const help = "Mute a user\n" +
  "Options :\n" +
  "`user` : The user to mute\n" +
  "`duration` : The duration as 30m | 2h | 3d | 2w | 1y (default 30m)\n" +
  "**Usage** : ```/mute <user> [duration] [reason]```"

module.exports = {
  data,
  execute,
  help
};
