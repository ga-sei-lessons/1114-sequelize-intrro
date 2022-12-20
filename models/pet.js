'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // tells sequelize that the pet model is the child in a 1:M relationship with user
      models.pet.belongsTo(models.user)
      // defines N:M with toys, and what join table to use
      models.pet.belongsToMany(models.toy, { through: "pets_toys" })
    }
  }
  pet.init({
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pet',
  });
  return pet;
};