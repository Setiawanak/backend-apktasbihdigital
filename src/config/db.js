const { Sequelize } = require("sequelize");
// config dari database localhost
const config = new Sequelize("dbpentasbih", "root", "", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

module.exports = config;
