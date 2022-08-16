const nanoid = require('nanoid')

const createRequestsModel = db => {
  return {
    findMany() {
      return db.get('messages').value()
    },

    create(request) {
      const newRequest = {id: nanoid(), ...request}

      db.get('messages').push(newRequest).write()
    },

    remove(id) {
      db.get('messages').remove({ id }).write()
    },

    update(request) {
      db.get('messages').find({ id: request.id}).assign({text: request.text}).write();
    },

    urgentMessage(request) {
      db.get('messages').find({ id: request.id}).assign({urgent: request.urgent}).write();
    }
  }
}

module.exports = createRequestsModel
