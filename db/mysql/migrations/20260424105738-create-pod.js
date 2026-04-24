'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pod_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cost_per_hr: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      gpu_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      image_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      machine_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      memory_in_gb: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      vcpu_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      template_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      network_volume_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      data_center_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      public_ip: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pods');
  },
};
