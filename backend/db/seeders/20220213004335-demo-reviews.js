'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 3,
        spotId: 2,
        content: "Fue muy divertido. Desearía haberme quedado más tiempo, pero me caí."
      },
      {
        userId: 2,
        spotId: 3,
        content: "Wow! So pretty! Would visit again 100%"
      },
      {
        userId: 2,
        spotId: 1,
        content: "How did I even leave a review here? I'm the owner."
      },
      {
        userId: 2,
        spotId: 1,
        content: "It must be seeder file..."
      },
      {
        userId: 3,
        spotId: 1,
        content: "Si supongo es un archivo de seed."
      },
      {
        userId: 2,
        spotId: 1,
        content: "How do you delete?"
      },
      {
        userId: 2,
        spotId: 1,
        content: "Hello???"
      },
      {
        userId: 2,
        spotId: 4,
        content: "Comment example"
      },
      {
        userId: 2,
        spotId: 6,
        content: "This is another comment example"
      },
      {
        userId: 2,
        spotId: 5,
        content: "It was fun, but overpriced."
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
