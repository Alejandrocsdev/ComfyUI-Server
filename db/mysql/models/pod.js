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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      costPerHr: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      gpuCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      imageName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      machineId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      memoryInGb: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      vcpuCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      templateId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      networkVolumeId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dataCenterId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      publicIp: {
        allowNull: true,
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
