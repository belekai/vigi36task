var mariadb = require('mariadb')
var { dbConfig } = require('../config/dbConfig')

var pool = mariadb.createPool(dbConfig)

module.exports = pool