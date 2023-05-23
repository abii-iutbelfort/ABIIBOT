const {REST, Routes} = require('discord.js');
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.BOT_TOKEN;

const commands = require('./get-commands');
const rest = new REST().setToken(token);


(async () => {
  try {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
      .then(() => console.log('Successfully deleted all guild commands.'))
      .catch(console.error);

    console.log(`Successfully deleted all application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();