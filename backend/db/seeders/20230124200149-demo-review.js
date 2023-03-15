'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 2,
          review: "Wow, this place has an awesome red couch. 10/10 would stay again!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 5,
          review: "This place was nice, until I realized it had a red couch. Now I'm never leaving.",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 1,
          review: "wow, this place was pog",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 4,
          review: "wow, this place was pog",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 3,
          review: "wow, this place was pog",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 4,
          review: "wow, this place was pog",
          stars: 5,
        },
        {
          spotId: 6,
          userId: 5,
          review: "wow, this place was pog",
          stars: 5,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      {}
    );
  }
};
