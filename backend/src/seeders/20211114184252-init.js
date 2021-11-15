'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Product - 1',
        price: 100,
        quantity: 10,
        description: 'Lorem 123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Product - 2',
        price: 200,
        quantity: 20,
        description: 'Lorem 123321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // await queryInterface.bulkInsert('Users', [
    //   {
    //     user
    //   }
    // ]);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products');
  },
};
