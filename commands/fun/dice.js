const {SlashCommandBuilder} = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('dice')
  .setDescription('Rolls the specified dices')
  .addIntegerOption(option =>
    option.setName('amount')
      .setDescription('The number of dices to roll'))
  .addIntegerOption(option =>
    option.setName('faces')
      .setDescription('The number of faces per dice'))
  .addBooleanOption(option =>
    option.setName('details')
      .setDescription('Whether to display each dice roll'));

const execute = async (interaction) => {
  const amount = interaction.options.getInteger('amount') ?? 1;
  const faces = interaction.options.getInteger('faces') ?? 6;
  const rolls = [];
  for (let i = 0; i < amount; i++)
    rolls.push(Math.floor(Math.random() * faces) + 1);
  const sum = rolls.reduce((partialSum, a) => partialSum + a, 0);
  let results = `Rolled ${amount}d${faces} : ${sum}`;
  if (interaction.options.getBoolean('details')) {
    for (let i = 0; i < rolls.length; i++)
      results += `\nDice${i + 1} : ${rolls[i]}`;
  }
  await interaction.reply(results);
}

const help = "Rolls the specified dices\n" +
  "Options :\n" +
  "`amount` : The number of dices to roll (default 1)\n" +
  "`faces` : The number of faces per dice (default 6)\n" +
  "`details` : Whether to display each dice roll (default false)\n"+
  "**Usage** : ```/dice [amount] [faces] [details]```"

module.exports = {data, execute, help};