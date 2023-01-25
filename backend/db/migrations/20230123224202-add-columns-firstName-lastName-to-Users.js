"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "Users",
      "firstName",
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options
    );
    await queryInterface.addColumn(
      "Users",
      "lastName",
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.dropTable(options);
  },
  // await queryInterface.removeColumn("Users", "firstName");
  // await queryInterface.removeColumn("Users", "lastName");
};
