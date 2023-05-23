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
// add more models here

// don't forget define relationships between models here too

module.exports = db;
