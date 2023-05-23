const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Bans a user from the server")
  .addUserOption((option) =>
    option.setName("user").setDescription("The user to ban").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("The reason for banning the user")
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

const execute = async (interaction) => {
  const user = interaction.options.getUser("user");
  const reason =
    interaction.options.getString("reason") ?? "No reason specified";
  await interaction.guild.members.ban(user, { reason });
  await interaction.reply(`Banned ${user} for \`${reason}\``);
};

const help =
  "Bans a user from the server\n" + "**Usage** : ```/ban <user> [reason]```";

module.exports = {
  data,
  execute,
  help,
};
