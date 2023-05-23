const { Events } = require("discord.js");
const Logger = require("../helpers/Logger");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute() {
    Logger.success("Bot ready!");
  },
};
