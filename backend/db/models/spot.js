"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Spot relationship to User
      Spot.belongsTo(models.User, { foreignKey: "ownerId" });

      // Spot relationship to Booking
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });

      // Spot relationship to Review
      Spot.hasMany(models.Review, { ReviewKey: "spotId" });

      // Spot relationship to SpotImage
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
    }
  }
  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: -180,
          max: 180,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
