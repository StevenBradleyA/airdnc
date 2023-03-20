"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Oregon Place",
          city: "Beaverton",
          state: "Oregon",
          country: "United States",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Modern Mid-Century Retreat",
          description:
            "Spotless, Sanitized & Stylish! Also equipped with an air sanitizer/ionizer for guests peace of mind! #StayinMyDistrict Beaverton! Mid-Century Modern retreat, built specifically w/guest comfort and convenience in mind. Colorful finishes, tasteful furnishings make for a bright, clean and stylish escape. Walk to parks, shopping, dining & weekly farmers market; 2 min shopping/entertainment district; 12 min downtown Portland.",
          price: 170,
        },
        {
          ownerId: 1,
          address: "1010 Desert Ave",
          city: "Palm Springs",
          state: "California",
          country: "United States",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Dazey Desert House",
          description: "Colorful maximal home owned by interior designer Dani Dazey, designer of the Trixie Motel. A midcentury gem tucked away at the foot of the San Jacinto mountain. Cozy time capsule designed by famous architect William Krisel featuring signature butterfly roof. Relax in the orange cowboy pool or hot tub in our yard and enjoy expertly designed interiors. Perfect retreat for anyone looking to enjoy the lush desert foliage but still, want the convenience of a 5-minute drive into downtown Palm Springs.",
          price: 300,
        },
        {
          ownerId: 2,
          address: "1212 Rocky Mountain Way",
          city: "Aspen",
          state: "Colorado",
          country: "United States",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Artful Aspen",
          description: "Nestled in the heart of Aspen, the Double Diamond Chalet is an artful masterpiece of a vacation home. Skylights throughout the chalet gild this contemporary space with warm sunlight. Adorned with selective art pieces and ceramics in every room, you'll be immersed in beauty as you enjoy your luxurious Aspen stay. ",
          price: 900,
        },
        {
          ownerId: 3,
          address: "1234 Broadway Place",
          city: "Nashville",
          state: "Tennessee",
          country: "United States",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Broadway Block",
          description: "Experience the energy of the city in this luxury Cityside unit, featuring views of historic downtown 2nd Ave., Nashville. Be inspired by the energy of being just one block off Broadway and walkable to the convention center and all the historical honky tonks located within a block from the Historic Pilcher Building. In the living and entertainment area of the unit you can hear and feel the music of Nashville.",
          price: 123,
        },
        {
          ownerId: 4,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Green House",
          description: "wow, this place is awesome",
          price: 123,
        },
        {
          ownerId: 5,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Yellow House",
          description: "wow, this place is awesome",
          price: 123,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Modern Mid-Century Retreat",
            "Dazey Desert House",
            "Red House",
            "Blue House",
            "Green House",
            "Yellow House",
          ],
        },
      },
      {}
    );
  },
};
