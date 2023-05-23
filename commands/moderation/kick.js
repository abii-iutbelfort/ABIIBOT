const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Kicks a user from the server")
  .addUserOption((option) =>
    option.setName("user").setDescription("The user to kick").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("The reason for kicking the user")
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);
const execute = async (interaction) => {
  const user = interaction.options.getUser("user");
  const reason =
    interaction.options.getString("reason") ?? "No reason specified";
  await interaction.guild.members.ban(user, { reason });
  await interaction.reply(`Banned ${user} for \`${reason}\``);
};
const help =
  "Kicks a user from the server\n" + "**Usage** : ```/kick <user> [reason]```";

module.exports = {
  data,
  execute,
  help,
};
