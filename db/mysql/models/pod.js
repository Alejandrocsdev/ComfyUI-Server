'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pod extends Model {
    static associate(models) {}
  }
  Pod.init(
    {
      podId: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Pod',
      tableName: 'pods',
      underscored: true,
    },
  );
  return Pod;
};
