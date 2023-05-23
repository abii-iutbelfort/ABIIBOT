const db = require("../models");
const User = db.User;

const create = async (userId) => {
  try {
    return await User.create({
      userId,
    });
  } catch (err) {
    console.error(err);
  }
};

const findByPk = async (userId) => {
  try {
    return await User.findByPk(userId);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  create,
  findByPk,
};
