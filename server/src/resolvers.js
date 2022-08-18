module.exports = {
  Query: {
    messages(_, {urgent}, {models}) {
      return models.Messages.findMany(urgent);
    },
  },
  Mutation: {
    createMessage(_, {input}, {models}) {
      return models.Messages.create(input);
    },
    removeMessage(_, {id}, {models}) {
      return models.Messages.remove(id);
    },
    updateMessage(_, {input}, {models}) {
      return models.Messages.update(input);
    },
    urgentMessage(_, {input}, {models}) {
      return models.Messages.urgent(input);
    }
  }
}
