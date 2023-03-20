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
          url: "https://img.peerspace.com/image/upload/w_1200,c_limit/c_crop,g_custom,f_auto,q_auto,dpr_auto/l_PS-logo,g_south_east,x_20,y_20,w_175,o_75/f3d0dv6bmdnsdrlckn0e",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://img.peerspace.com/image/upload/w_1200,c_limit/c_crop,g_custom,f_auto,q_auto,dpr_auto/l_PS-logo,g_south_east,x_20,y_20,w_175,o_75/qpdo4c87uns80ukze2nw",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://img.peerspace.com/image/upload/w_1200,c_limit/c_crop,g_custom,f_auto,q_auto,dpr_auto/l_PS-logo,g_south_east,x_20,y_20,w_175,o_75/ycetzoh3r7zyyg0lpllh",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://img.peerspace.com/image/upload/w_1200,c_limit/c_crop,g_custom,f_auto,q_auto,dpr_auto/l_PS-logo,g_south_east,x_20,y_20,w_175,o_75/dr8xopijhggekowpkcaq",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://img.peerspace.com/image/upload/w_1200,c_limit/c_crop,g_custom,f_auto,q_auto,dpr_auto/l_PS-logo,g_south_east,x_20,y_20,w_175,o_75/ij0hxne02kynwoubyehe",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48849852/original/c19c0b90-c70b-44f1-b9be-ba701c226036.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48849852/original/de10b645-8980-45f8-b740-a505be3c1323.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48849852/original/2428af19-2316-4c54-8516-440b8e931519.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48849852/original/929a14bf-ed9d-4726-a139-91df120f14fa.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48849852/original/01ab67c1-6702-4a38-add9-36a2083d39e2.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-32603808/original/27c538ff-4347-4b7e-abef-787dee60291d.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/9b985f86-5815-444f-9b82-7891d7f5fccf.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/3268de6e-13b0-4e6f-b63a-71d3e6da1367.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/eb85407d-b77a-4e70-b9e4-9a027bd0aa20.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/d82a68ab-3484-43a3-9267-c45ff0d2baa6.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://media.architecturaldigest.com/photos/61b0ce48dccdb75fa170f8f7/16:9/w_2560%2Cc_limit/PurpleCherry_Williams_0012.jpg",
          preview: true,
        },
        {
          spotId: 6,
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
