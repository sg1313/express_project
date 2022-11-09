'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScholarshipAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScholarshipAccount.belongsTo(models.Student);
    }
  }
  ScholarshipAccount.init({
    accountNum: DataTypes.STRING,
    validDate: DataTypes.DATE,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ScholarshipAccount',
  });
  return ScholarshipAccount;
};