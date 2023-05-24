"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
          lat: 44.00000,
          lng: -120.500000,
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
          lat: 33.830517,
          lng: -116.545601,
          name: "Dazey Desert House",
          description:
            "Colorful maximal home owned by interior designer Dani Dazey, designer of the Trixie Motel. A midcentury gem tucked away at the foot of the San Jacinto mountain. Cozy time capsule designed by famous architect William Krisel featuring signature butterfly roof. Relax in the orange cowboy pool or hot tub in our yard and enjoy expertly designed interiors. Perfect retreat for anyone looking to enjoy the lush desert foliage but still, want the convenience of a 5-minute drive into downtown Palm Springs.",
          price: 300,
        },
        {
          ownerId: 2,
          address: "1212 Rocky Mountain Way",
          city: "Aspen",
          state: "Colorado",
          country: "United States",
          lat: 39.113014,
          lng: -105.358887,
          name: "Artful Aspen",
          description:
            "Nestled in the heart of Aspen, the Double Diamond Chalet is an artful masterpiece of a vacation home. Skylights throughout the chalet gild this contemporary space with warm sunlight. Adorned with selective art pieces and ceramics in every room, you'll be immersed in beauty as you enjoy your luxurious Aspen stay. ",
          price: 900,
        },
        {
          ownerId: 3,
          address: "1234 Broadway Place",
          city: "Nashville",
          state: "Tennessee",
          country: "United States",
          lat: 36.174465,
          lng: -86.767967,
          name: "Broadway Block",
          description:
            "Experience the energy of the city in this luxury Cityside unit, featuring views of historic downtown 2nd Ave., Nashville. Be inspired by the energy of being just one block off Broadway and walkable to the convention center and all the historical honky tonks located within a block from the Historic Pilcher Building. In the living and entertainment area of the unit you can hear and feel the music of Nashville.",
          price: 250,
        },
        {
          ownerId: 4,
          address: "1111 Mesa SW Street",
          city: "Cortez",
          state: "Colorado",
          country: "United States",
          lat: 39.113014,
          lng: -105.358887,
          name: "Canyon Cliff House",
          description:
            "Stay on the flank of Sleeping Ute Mountain in historic McElmo Canyon just 40 minutes from Mesa Verde and 20 minutes from the town of Cortez. The Cliff House is built right into the red rock cliff wall of a private red rock canyon alcove with comfortable amenities, internet, nearby petroglyphs and sweeping views down canyon.",
          price: 122,
        },
        {
          ownerId: 5,
          address: "1414 Dream SE Street",
          city: "Three Rivers",
          state: "California",
          country: "United States",
          lat: 34.052235,
          lng: -118.243683,
          name: "The River Island",
          description:
            "The River Island was created as an homage to the love story of G&G, their wedding at an Italian Castle, and their dream to raise a river child. The house  once served as settlement for Yokut tribes at the foothills of the National Sequoia and Mineral King Parks.",
          price: 277,
        },
        {
          ownerId: 2,
          address: "2095 Manhattan SE Street",
          city: "New York",
          state: "New York",
          country: "United States",
          lat: 40.730610,
          lng: -73.935242,
          name: "Spacious NYC Stay",
          description:
            "Welcome to this stunning NYC apartment, where a soothing blue theme envelops the space, creating an atmosphere of tranquility and style. Immerse yourself in the elegant ambiance of the carefully curated decor, featuring tasteful blue accents that effortlessly blend with the modern design. Natural light dances through expansive windows, illuminating the open layout, while sleek furniture invites relaxation. The well-appointed kitchen boasts stainless steel appliances and marble countertops, perfect for culinary enthusiasts. Retreat to the serene bedroom adorned with luxurious blue linens, offering a peaceful sanctuary. With its impeccable style and prime location, this blue-themed haven offers the epitome of refined city living.",
          price: 500,
        },
        {
          ownerId: 3,
          address: "5555 8th Street",
          city: "Bellvue",
          state: "Washington",
          country: "United States",
          lat: 47.610378,
          lng: -122.200676,
          name: "Quiet Northwest Escape",
          description:
            "Escape to a tranquil oasis in Bellevue, Washington, where this serene house offers a peaceful retreat from the bustling world. Nestled amidst lush greenery, the property exudes a sense of calm and privacy. Step inside to discover an inviting interior bathed in natural light, with a layout designed for comfort and relaxation. The spacious living areas provide a cozy ambiance, while the well-equipped kitchen caters to your culinary desires. Unwind in the peaceful bedrooms, each offering a soothing sanctuary. Outside, a serene backyard beckons, providing a serene setting for outdoor gatherings or quiet contemplation. Embrace the serenity of this quiet Bellevue house, where tranquility and comfort seamlessly blend for a truly rejuvenating experience.",
          price: 280,
        },
        {
          ownerId: 4,
          address: "1414 Aligator SW Street",
          city: "Tampa",
          state: "Florida",
          country: "United States",
          lat: 27.964157,
          lng: -82.452606,
          name: "Coastal Haven",
          description:
            "Indulge in coastal living at its finest in this exquisite house nestled in the vibrant city of Tampa, Florida. Located just steps away from the glistening shores, this coastal retreat offers breathtaking views of the azure waters and golden sand. Step inside to discover a beautifully appointed interior, where sunlight streams through large windows, illuminating the open-concept living spaces. The nautical-inspired decor and soft hues create a serene ambiance, evoking a sense of seaside tranquility. The well-designed kitchen is a haven for culinary enthusiasts, while the airy bedrooms provide a peaceful haven for relaxation. Outside, a spacious patio awaits, perfect for savoring the salty breeze and hosting memorable gatherings. With its idyllic coastal charm and prime location, this Tampa house invites you to embrace the coastal lifestyle and create lasting memories by the sea.",
          price: 142,
        },
        {
          ownerId: 5,
          address: "1914 Island SE Street",
          city: "Shelton",
          state: "Washington",
          country: "United States",
          lat: 47.2082,
          lng: -123.1037,
          name: "Puget Sound Island Retreat",
          description:
            "Welcome to this exceptional house nestled along the pristine shores of the Puget Sound in Shelton, Washington. Embrace the beauty of waterfront living as you soak in panoramic views of the Sound's tranquil waters and majestic mountains. The house boasts a seamless blend of rustic charm and modern elegance, with spacious living areas designed to maximize the breathtaking vistas. Immerse yourself in the serenity of nature from the expansive windows, or step onto the private deck to enjoy the gentle sea breeze. The well-appointed kitchen is a haven for culinary enthusiasts, while the cozy bedrooms offer a peaceful retreat. Outside, a meticulously landscaped yard leads to a private beach, inviting you to explore the wonders of the shoreline. With its idyllic setting and unparalleled views, this house on the Puget Sound offers a truly enchanting coastal lifestyle.",
          price: 349,
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
            "Artful Aspen",
            "Broadway Block",
            "Canyon Cliff House",
            "The River Island",
            "Spacious NYC Stay",
            "Quiet Northwest Escape",
            "Coastal Haven",
            "Puget Sound Island Retreat",
          ],
        },
      },
      {}
    );
  },
};
