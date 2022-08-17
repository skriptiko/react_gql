const nanoid = require('nanoid')

const createRequestsModel = db => {
  return {
    findMany() {
      return db.get('messages').value();
    },

    create(request) {
      const newMessage = {id: nanoid(), ...request};

      db.get('messages').push(newMessage).write();

      return newMessage;
    },

    remove(id) {
      db.get('messages').remove({ id }).write();
    },

    update(request) {
      db.get('messages').find({ id: request.id}).assign({
        text: request.text,
        urgent: request.urgent,
        logo: request.logo
      }).write();

      return db.get('messages').find({ id: request.id}).value();
    },

    urgent(request) {
      db.get('messages').find({ id: request.id}).assign({urgent: request.urgent}).write();

      return db.get('messages').find({ id: request.id}).value();
    }
  }
}

module.exports = createRequestsModel
