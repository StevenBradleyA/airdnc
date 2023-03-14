"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://images.trvl-media.com/lodging/77000000/76720000/76719200/76719145/b9bf0051.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://images.trvl-media.com/lodging/77000000/76720000/76719200/76719145/80b5161e.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://images.trvl-media.com/lodging/77000000/76720000/76719200/76719145/90c81537.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://images.trvl-media.com/lodging/77000000/76720000/76719200/76719145/334c31e9.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://images.trvl-media.com/lodging/77000000/76720000/76719200/76719145/8bf20c85.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          preview: false,
        },
        
        {
          spotId: 2,
          url: "https://media.architecturaldigest.com/photos/61b0ce48dccdb75fa170f8f7/16:9/w_2560%2Cc_limit/PurpleCherry_Williams_0012.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://media.architecturaldigest.com/photos/61b0ce48dccdb75fa170f8f7/16:9/w_2560%2Cc_limit/PurpleCherry_Williams_0012.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://media.architecturaldigest.com/photos/61b0ce48dccdb75fa170f8f7/16:9/w_2560%2Cc_limit/PurpleCherry_Williams_0012.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://media.architecturaldigest.com/photos/61b0ce48dccdb75fa170f8f7/16:9/w_2560%2Cc_limit/PurpleCherry_Williams_0012.jpg",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
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
