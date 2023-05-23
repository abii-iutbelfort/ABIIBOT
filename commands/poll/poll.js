const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("poll")
  .setDescription("Create a poll")
  .addStringOption((option) =>
    option
      .setName("question")
      .setDescription("The question to ask")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("choices")
      .setDescription("The choices to choose from")
      .setRequired(false)
  );

const execute = async (interaction) => {
  const question = interaction.options.getString("question");
  const choices = (interaction.options.getString("choices") ?? "")
    .split(",")
    .map((choice) => choice.trim());

  if (choices.length > 10) {
    await interaction.reply({
      content: "You can't have more than 10 choices",
      ephemeral: true,
    });
    return;
  }
  let reactions = [];
  let indeces = [];
  let description = null;

  if (choices.length <= 2) {
    reactions = ["👍", "👎"];
    indeces = ["Oui", "Non"];
  } else {
    reactions = Array(choices.length)
      .fill()
      .map((_, index) => `${index}️⃣`);
    indeces = Array(choices.length)
      .fill()
      .map((_, index) => index);
    description = choices
      .map((choice, index) => `${indeces[index]} - ${choice}`)
      .join("\n");
  }

  // Create the embed
  const embed = {
    title: question,
    description,
    author: {
      name: interaction.user.username,
      icon_url: interaction.user.avatarURL(),
    },
    color: 0x006600,
    footer: {
      text: "React to vote",
    },
    timestamp: new Date(),
  };

  // Send the embed
  const message = await interaction.reply({
    embeds: [embed],
    fetchReply: true,
  });

  // Add reactions
  for (let i = 0; i < reactions.length; i++) {
    await message.react(reactions[i]);
  }

  // Delete the message after 1 week
  setTimeout(() => {
    message.delete();
  }, 7 * 24 * 60 * 60 * 1000);
};

const help =
  "Create a poll\n" +
  "Options :\n" +
  "`question` : The question to ask\n" +
  "`choices` : A coma separeted list of choices\n" +
  "**Usage** :```/poll <question> [choices]```";

module.exports = {
  data,
  execute,
  help,
};
