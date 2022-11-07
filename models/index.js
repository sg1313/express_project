// mysql 과 연동하기/ 시퀄라이즈 사용
// config.json 은 보안상 깃에 안올림

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

module.exports = db;

