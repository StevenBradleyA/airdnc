"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2021-11-19",
          endDate: "2021-11-20",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2021-11-19",
          endDate: "2021-11-20",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2021-11-19",
          endDate: "2021-11-20",
        },
        {
          spotId: 4,
          userId: 4,
          startDate: "2021-11-19",
          endDate: "2021-11-20",
        },
        {
          spotId: 5,
          userId: 5,
          startDate: "2021-11-19",
          endDate: "2021-11-20",
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
