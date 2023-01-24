'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "https://google.com",
        },
        {
          reviewId: 2,
          url: "https://google.com",
        },
        {
          reviewId: 3,
          url: "https://google.com",
        },
        {
          reviewId: 4,
          url: "https://google.com",
        },
        {
          reviewId: 5,
          url: "https://google.com",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  }
};
