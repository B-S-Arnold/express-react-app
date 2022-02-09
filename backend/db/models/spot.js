'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    lng: {
      type: DataTypes.DECIMAL,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {});
  Spot.associate = function (models) {
    // associations can be defined here
    Spot.belongsTo(models.User, { foreignKey: 'userId' })
    Spot.hasMany(models.Image, { foreignKey: 'spotId' })
    Spot.hasMany(models.Review, { foreignKey: 'spotId' })

  };

  Spot.create = async function ({ userId, address, city, state, country, name, price, description }) {

    const spot = await Spot.create({
      userId,
      address,
      city,
      state,
      country,
      name,
      price,
      description
    });
    return await Spot.findByPk(spot.id);
  };
  return Spot;
};