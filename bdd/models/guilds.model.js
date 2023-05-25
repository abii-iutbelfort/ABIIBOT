module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Guilds", {
    guildId: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    welcomeChannelId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    newComerRoleName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "newcomer",
    },
  });
};
