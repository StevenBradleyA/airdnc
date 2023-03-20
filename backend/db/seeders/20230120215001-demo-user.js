"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Demo",
          lastName: "Lition",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Takumi",
          lastName: "Fujiwara",
          email: "akinadelivery@user.io",
          username: "HachiRoku",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Keisuke",
          lastName: "Takahashi",
          email: "eurobeat@user.io",
          username: "rx7forlife",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Natsuki",
          lastName: "Mogi",
          email: "theworst@user.io",
          username: "takeMeBackToTokyo",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Itsuki",
          lastName: "Takeuchi",
          email: "lonelydrivers@user.io",
          username: "streetracernogf5",
          hashedPassword: bcrypt.hashSync("password5"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Demo-lition",
            "FakeUser1",
            "FakeUser2",
            "FakeUser3",
            "FakeUser4",
          ],
        },
      },
      {}
    );
  },
};
