'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
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
          spotId: 3,
          userId: 3,
          review: "wow, this place was very poggers. It changed my life forever.",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 4,
          review: "wow, I can't believe this place actually had a couch. ",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 3,
          review: "wow, this place was very nice",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 4,
          review: "wow, this place was nice",
          stars: 5,
        },
        {
          spotId: 6,
          userId: 5,
          review: "wow, this place was a spicy meatball",
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
        spotId: { [Op.in]: [1, 3, 5, 6] },
      },
      {}
    );
  }
};
