module.exports = {
  Query: {
    requests(_, {input}, {models}) {
      return models.Request.findMany(input || {})
    },
    request(_, {id}, {models}) {
      return models.Request.findOne({id})
    },
  },
  Mutation: {
    createRequest(_, {input}, {models}) {
      return models.Request.create({...input});
    }
  }
}
