const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('src/db/db.json')
const db = low(adapter)

const messagesModel = require('./messages')

module.exports = {
  models: {
    Messages: messagesModel(db),
  },
  db
}
