const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!")
  .addBooleanOption((option) =>
    option
      .setName("visible")
      .setDescription("Whether to display your ping to everyone !")
  );

const execute = async (interaction) => {
  const msg = await interaction.reply({
    content: `Pong !\nWebsocket heartbeat: ${interaction.client.ws.ping}ms.\nPinging...`,
    ephemeral: !interaction.options.getBoolean("visible"),
    fetchReply: true,
  });

  interaction.editReply(
    msg.content.replace(
      "Pinging...",
      `Roundtrip latency: ${
        msg.createdTimestamp - interaction.createdTimestamp
      }ms`
    )
  );
};

const help =
  "Replies with Pong!\n" +
  "Options :\n" +
  "`delay` : Whether to display your ping (default false)\n" +
  "**Usage** : ```/ping [delay]```";

module.exports = { data, execute, help };
