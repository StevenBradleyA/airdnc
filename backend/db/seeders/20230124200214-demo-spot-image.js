"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
          url: "https://a0.muscache.com/im/pictures/794e91e5-32f5-4605-932f-0622d65c0cda.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/02a6b6df-bb89-4721-ba7f-c703d94a99d4.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/f0a81746-5e94-4a9f-a8eb-ce43a21e7370.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/1dce83e9-f659-4947-a074-992c887b7cc6.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/e4921b8e-a913-4fea-ac21-f22c99833090.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42300535/original/b0276d03-2288-4047-bd25-a7a8ce6c418b.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42300535/original/91b4ae82-358e-4188-8943-79b2cc7ea979.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42300535/original/625734f4-58f8-470b-aa9d-59dd905cac53.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42300535/original/34b5bfaa-1255-4228-9001-7b853726c056.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42300535/original/d19765c2-59dc-471d-9800-9e9ef869fb89.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-821685298933103009/original/6acc0b82-522b-4f9c-952a-083323dc641c.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-821685298933103009/original/910475ee-39a8-46f6-a514-80e87eaa4c83.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-821685298933103009/original/4f7898d9-533a-4c0b-b2c9-e47ffe550b34.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-821685298933103009/original/8c23a905-3d93-4f29-b4e0-71fb71cac185.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/63dc983e-ccf3-4351-b3b0-c1aab0bcbe93.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/airflow/Hosting-712796145628240218/original/0247d695-4024-47cd-9db3-041133ff297a.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/airflow/Hosting-712796145628240218/original/702db762-e686-4403-96bb-2ab1d636438c.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/airflow/Hosting-712796145628240218/original/721a525b-50ed-44c6-a003-88eea991e9cb.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/airflow/Hosting-712796145628240218/original/eb8971b4-e011-4ae0-a372-540cfc96b4c1.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/airflow/Hosting-712796145628240218/original/1bfeb62a-ebfb-4029-b86b-7727ac25c837.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-643385450902712223/original/8d2ac73a-4a41-47ef-a04d-592a6a746b5a.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-643385450902712223/original/7081690f-0103-423e-a5bb-8cc765f4bbfc.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-643385450902712223/original/1d76e7df-0d17-4ce4-9e03-c09d1a43cca8.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-643385450902712223/original/4c0709e2-1950-4392-a449-06686538a008.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-643385450902712223/original/0ca560e6-c5bd-4152-bfc7-eddd65d88dc2.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-774794666091490168/original/cdc87817-999c-4566-9a35-5fb24a408032.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-774794666091490168/original/13f5457a-61ee-4812-9b47-f135fe76d099.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-774794666091490168/original/1b169be6-d013-4782-8aa6-7d15b80794c5.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-774794666091490168/original/5c91d2fc-ff69-42fa-af3b-bb58e4b2d163.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-774794666091490168/original/f749eb79-a728-44b9-b0a0-bf1b30121d9d.jpeg?im_w=720",
          preview: false,
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      {}
    );
  },
};
