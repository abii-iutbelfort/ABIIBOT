require("dotenv").config();

module.exports = {
  DB: process.env.ABIIBOT_BDD_NAME,
  USER: process.env.ABIIBOT_BDD_USER,
  PASSWORD: process.env.ABIIBOT_BDD_PASSWD,
  options: {
    host: process.env.ABIIBOT_BDD_HOST,
    dialect: "postgresql",
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
