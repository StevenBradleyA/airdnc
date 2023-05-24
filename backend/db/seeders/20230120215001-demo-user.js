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
          email: "demo@aa.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Liam",
          lastName: "Smith",
          email: "liam@aa.io",
          username: "Liamrules",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Olivia",
          lastName: "Johnson",
          email: "olivia@aa.io",
          username: "olivarules",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Noah",
          lastName: "Williams",
          email: "noah@aa.io",
          username: "noahiscool",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Ava",
          lastName: "Jones",
          email: "Ava@aa.io",
          username: "avarules",
          hashedPassword: bcrypt.hashSync("password"),
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
            "Liamrules",
            "olivarules",
            "noahiscool",
            "avarules",
          ],
        },
      },
      {}
    );
  },
};
