module.exports = {
  Query: {
    messages(_, {input}, {models}) {
      return models.Messages.findMany()
    },
    message(_, {id}, {models}) {
      return models.Messages.findOne({id})
    },
  },
  Mutation: {
    sendMessage(_, {input}, {models}) {
      return models.Messages.create(input);
    },
    removeMessage(_, {id}, {models}) {
      return models.Messages.remove(id);
    },
    updateMessage(_, {input}, {models}) {
      return models.Messages.update(input);
    }
  }
}
