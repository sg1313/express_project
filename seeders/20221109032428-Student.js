'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Students', [
      {
        registrationNum: 20203718,
        name: '김철수',
        age: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationNum: 20208712,
        name: '이나라',
        age: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationNum: 20190124,
        name: '이태용',
        age: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationNum: 20180051,
        name: '최미나',
        age: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Students', null);
  }
};
