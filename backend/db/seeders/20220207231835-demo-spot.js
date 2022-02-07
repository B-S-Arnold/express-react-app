'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
     {
       userId: 1,
       address: "Red Rock Canyon",
       city: "Jacksonville",
       state: "New New Hampshire",
       country: "Martian Federation",
       name: "Romantic Ruby Getaway",
       price: 5
     },
     {
       userId: 1,
       address: "Upper Left Side",
       city: "Ring Two",
       state: "Newest New Hampshire",
       country: "Saturn",
       name: "Beautiful Ledge",
       price: 10
     },
     {
       userId: 2,
       address: "152 Scottdale Ave.",
       city: "Casazul",
       state: "Hampshire Nuevo",
       country: "Neptatún",
       name: "Pintoresco Lugar de Pesca",
       price: 15.99
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
