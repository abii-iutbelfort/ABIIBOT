module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Users", {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    // add more fields here
  });
};
