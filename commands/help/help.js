const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder
} = require('discord.js');

const helpBuilder = new (require('./helper/HelpEmbedBuilder'))();

const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('List all of my commands or info about a specific command')

const execute = async (interaction) => {
  const select = new StringSelectMenuBuilder()
    .setCustomId('help-select')
    .setPlaceholder('Select a category')

  helpBuilder.getPages().forEach(page => {
    select.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(page)
        .setValue(page)
    )
  })

  const row = new ActionRowBuilder()
    .addComponents(select);

  const response = await interaction.reply({
    content: "Select category",
    components: [row],
    ephemeral: true
  });
  const filter = i => i.customId === 'help-select' && i.user.id === interaction.user.id;

  const collector = response.createMessageComponentCollector({filter, time: 3_600_000});

  collector.on('collect', async i => {
    const embed = helpBuilder.getEmbed(i.values[0], i.member)
    await i.update({embeds: [embed]})
  });

  collector.on('end', async () => {
    // delete the message after 3 seconds
    await response.delete()
  })
}

module.exports = {
  data,
  execute,
}
