const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const parse = require("parse-duration");

const data = new SlashCommandBuilder()
  .setName('clickme')
  .setDescription('Dont click the button !')

const execute = async (interaction) => {
  const actionRow = new ActionRowBuilder()

  const btn = new ButtonBuilder()
    .setCustomId('clickme')
    .setLabel("Secret button")
    .setStyle(ButtonStyle.Danger)

  actionRow.addComponents(btn)

  const response = await interaction.reply({
    content: '**Ne clique pas sur le boutton !**',
    components: [actionRow]
  })

  try {
    const btnInteraction = await response.awaitMessageComponent({time: 6000 * 15})
    // timeout the user for 1day
    await btnInteraction.member.timeout(parse('1d'), 'Clicked the forbidden button')

    await btnInteraction.update({
      content: `${btnInteraction.member} a cliqué..\nJ'avais dit de pas le faire !\nIl été mute pendant 1 jour pour avoir cliqué sur le boutton interdit!\\n A demain !\``,
      components: []
    })

  } catch (e) {
    console.error(e)
    await response.editReply({content: "C'est bien, personnes n'a cliqué ! :)", components: []});
  }
}

const help = "Don't click the button ! It is forbidden...\n" +
  "**Usage** : ```/clickme```"

module.exports = {
  data,
  execute,
  help
}