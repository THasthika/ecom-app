module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductImages', {
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId',
        },
      },
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      extension: {
        type: Sequelize.STRING,
      },
      rank: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductImages');
  },
};
