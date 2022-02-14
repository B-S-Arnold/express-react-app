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
       userId: 2,
       address: "Red Rock Canyon",
       city: "Jacksonville",
       state: "New New Hampshire",
       country: "Martian Federation",
       name: "Romantic Ruby Getaway",
       price: 5
     },
     {
       userId: 2,
       address: "Upper Left Side",
       city: "Ring Two",
       state: "Newest New Hampshire",
       country: "Saturn",
       name: "Beautiful Ledge",
       price: 10,
       description: "Don't fall off..."
     },
     {
       userId: 3,
       address: "152 Scottdale Ave.",
       city: "Casazul",
       state: "Hampshire Nuevo",
       country: "Neptatún",
       name: "Pintoresco Lugar de Pesca",
       price: 15.99,
       description: "La vista más hermosa de este lado del Mississippi."
     },
     {
       userId: 1,
       address: "Jupiter",
       city: "Jupitown",
       state: "Zuesland",
       country: "Jupitonia",
       name: "This is the name",
       price: 5,
       description: "This is a planet. I'm not sure why they are all planets."
     },
     {
       userId: 2,
       address: "1 Pluto Lane",
       city: "Plutoland",
       state: "Plutopia",
       country: "Plutocracy",
       name: "Pluto",
       price: 10,
       description: "It's Pluto"
     },
     {
       userId: 1,
       address: "My house",
       city: "App Academy",
       state: "Online",
       country: "World Wide Web",
       name: "Earth",
       price: 15.99,
       description: "Its an NFT"
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
