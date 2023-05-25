// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const fs = require("node:fs");
const path = require("node:path");
const logger = require("./helpers/Logger");

require("dotenv").config();
const token = process.env.ABIIBOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

require("./helpers/load-commands")(client);
require("./helpers/attach-events")(client);

logger.log("Syncing database...");
const bdd = require("./bdd/models");

bdd.sequelize
  .sync({ logging: false, force: true })
  .then(async () => {
    client.bdd = require("./bdd/controllers");
    logger.success("Database connected!");
  })
  .catch((e) => {
    logger.error("Database connection failed!", e);
  });

logger.log("Logging in...");
// Log in to Discord with your client's token
client
  .login(token)
  .then(() => {
    logger.success(`Bot logged in as ${client.user.tag}!`);
  })
  .catch((e) => {
    logger.error("Bot login failed!", e);
  });
