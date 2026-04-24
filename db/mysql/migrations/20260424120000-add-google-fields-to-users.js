'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'email', {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('users', 'avatar', {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('users', 'last_login', {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'email');
    await queryInterface.removeColumn('users', 'avatar');
    await queryInterface.removeColumn('users', 'last_login');
  },
};
