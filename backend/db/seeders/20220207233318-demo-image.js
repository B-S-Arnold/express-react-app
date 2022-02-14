'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
     {
       spotId: 1,
       url: "https://astronomy.com/-/media/Images/News%20and%20Observing/News/2021/09/marslandscape.jpg?mw=600"
     },
     {
       spotId: 2,
       url: "https://www.worldatlas.com/r/w960-q80/upload/fa/9d/4f/shutterstock-645002791.jpg"
     },
     {
       spotId: 3,
       url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/neptune-close-up-royalty-free-illustration-1625562249.jpg?crop=0.677xw:1.00xh;0.166xw,0&resize=980:*"
     },
     {
       spotId: 4,
       url: "https://cdn.vox-cdn.com/thumbor/3hRXvyoAnTO45HJIl1_VloqMNSA=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/10842939/pia21974.jpg"
     },
     {
       spotId: 5,
       url: "https://solarsystem.nasa.gov/system/resources/detail_files/933_BIG_P_COLOR_2_TRUE_COLOR1_1980.jpg"
     },
     {
       spotId: 6,
       url: "https://cdn.vox-cdn.com/thumbor/aGqpkHoX_oBxCT0tBKNU3mZaLSg=/36x0:983x631/1200x800/filters:focal(36x0:983x631)/cdn.vox-cdn.com/assets/1114614/earth-russia.jpg"
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
