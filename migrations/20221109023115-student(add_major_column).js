'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Students', 'major', Sequelize.STRING)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Students', 'major');
  }
};

// 작성후 npx sequelize db:migrate --env 'production' 실행해야 major 컬럼이 생성됨
// 튜토리얼5. 특정 파일 undo하기 : npx sequelize db:migrate:undo --env 'production' --name 20221109023115-student\(add_major_column\).js
// 이때 파일은 삭제도되지 않기 때문에 다시 major 컬럼을 생성하는 명령어를 migrate 하면 컬럼이 생성된다.