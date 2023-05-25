const Logger = require("../../helpers/Logger");
const db = require("../models");
const Guild = db.Guild;

const findByPk = async (guildId) => {
  try {
    const guild = await Guild.findByPk(guildId);
    if (!guild) {
      return await Guild.create({
        guildId,
      });
    }
    return guild;
  } catch (err) {
    Logger.error(err);
  }
};

const setWelcomeChannel = async (guildId, channelId) => {
  try {
    const guild = await findByPk(guildId);
    guild.welcomeChannelId = channelId;
    await guild.save();
  } catch (err) {
    Logger.error(err);
  }
};

const setNewComerRoleName = async (guildId, roleName) => {
  try {
    const guild = await findByPk(guildId);
    guild.newComerRoleName = roleName;
    await guild.save();
  } catch (err) {
    Logger.error(err);
  }
};

const getNewComerRoleName = async (guildId) => {
  try {
    const guild = await findByPk(guildId);
    return guild.newComerRoleName;
  } catch (err) {
    Logger.error(err);
  }
};

const getWelcomeChannel = async (guildId) => {
  try {
    const guild = await findByPk(guildId);
    return guild.welcomeChannelId;
  } catch (err) {
    Logger.error(err);
  }
};

module.exports = {
  findByPk,
  setWelcomeChannel,
  setNewComerRoleName,
  getNewComerRoleName,
  getWelcomeChannel,
};
