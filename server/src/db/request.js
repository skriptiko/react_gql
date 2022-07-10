const nanoid = require('nanoid')

const createRequestModel = db => {
  return {
    findMany(filter) {
      return db.get('request')
        .filter(filter)
        .orderBy(['createdAt'], ['desc'])
        .value()
    },

    findOne(filter) {
      return db.get('request')
        .find(filter)
        .value()
    },

    create(request) {
      const newRequest = {id: nanoid(), createdAt: Date.now(), ...request}

      db.get('request')
        .push(newRequest)
        .write()

      return newRequest
    }
  }
}

module.exports = createRequestModel
