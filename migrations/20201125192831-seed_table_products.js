let dbm
let type
let fs = require('fs')
let path = require('path')
let Promise
exports.setup = (options) => {
  dbm = options.dbmigrate
  type = dbm.dataType
  Promise = options.Promise
}
exports.up = (db) => {
  const filePath = path.join(__dirname, 'sqls', '20201125192831-seed_table_products_up.sql')
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err)
      resolve(data);
    })
  })
      .then((data) => {
        return db.runSql(data)
      })
}
exports.down = (db) => {
  const filePath = path.join(__dirname, 'sqls', '20201125192831-seed_table_products_down.sql')
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err)
      resolve(data);
    })
  })
      .then((data) => {
        return db.runSql(data)
      })
}