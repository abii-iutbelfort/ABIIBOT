const bddConfig = require("../config/bdd.config.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  bddConfig.DB,
  bddConfig.USER,
  bddConfig.PASSWORD,
  bddConfig.options
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Guild = require("./guilds.model.js")(sequelize, Sequelize);
// add more models here

// don't forget define relationships between models here too
db.User.belongsToMany(db.Guild, {
  through: "UserGuilds",
  foreignKey: "userId",
});
db.Guild.belongsToMany(db.User, {
  through: "UserGuilds",
  foreignKey: "guildId",
});

module.exports = db;
