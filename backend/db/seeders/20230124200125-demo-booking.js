"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 2,
          startDate:new Date ("2023-6-5"),
          endDate:new Date ("2023-6-7"),
        },
        {
          spotId: 1,
          userId: 3,
          startDate:new Date ("2023-6-12"),
          endDate:new Date ("2023-6-15"),
        },
        {
          spotId: 3,
          userId: 4,
          startDate:new Date ("2023-6-18"),
          endDate:new Date ("2023-6-19"),
        },
        {
          spotId: 3,
          userId: 5,
          startDate:new Date ("2023-6-5"),
          endDate:new Date ("2023-6-7"),
        },
        {
          spotId: 4,
          userId: 1,
          startDate:new Date ("2023-6-12"),
          endDate:new Date ("2023-6-15"),
        },
        {
          spotId: 4,
          userId: 4,
          startDate:new Date ("2023-6-18"),
          endDate:new Date ("2023-6-19"),
        },
        {
          spotId: 4,
          userId: 2,
          startDate:new Date ("2023-6-19"),
          endDate:new Date ("2023-6-20"),
        },

      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
