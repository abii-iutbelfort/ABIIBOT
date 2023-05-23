const {SlashCommandBuilder, ChannelType} = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('say')
  .setDescription('Replies with your input!')
  .addStringOption(option =>
    option.setName('input')
      .setDescription('The text to reply with')
      .setRequired(true)
      .setMaxLength(2000))
  .addChannelOption(option =>
    option.setName('channel')
      .setDescription('The channel to send the message in')
      .addChannelTypes(ChannelType.GuildText))
const execute = async (interaction) => {
  const input = interaction.options.getString('input');
  const channel = interaction.options.getChannel('channel') ?? interaction.channel;
  if (channel !== interaction.channel) {
    await channel.send(input);
    await interaction.reply(`Sent message in ${channel}`);
  } else
    await interaction.reply(input);
}

const help = "Replies with your input!\n" +
  "Options :\n" +
  "`input` : The text to reply with\n" +
  "`channel` : The channel to send the message in (default current channel)\n" +
  "**Usage** : ```/say <input> [channel]```"

module.exports = {
  data,
  execute,
  help
}
