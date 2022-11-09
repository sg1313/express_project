'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasOne(models.ScholarshipAccount, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
      Student.belongsToMany(models.Course, { through: models.Grade });
    }
  }
  Student.init({
    registrationNum: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student', // 테이블명은 자동으로 소문자&복수형으로 바뀜
  });
  return Student;
};