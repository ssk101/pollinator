const Joi = require('@hapi/joi')
const joi = require('../../../middlewares/joi')
const serialize = require('../../../middlewares/serialize')
const imdb = require('../../../services/imdb')
const handleResponse = require('../../../services/handle-response')

const validations = Joi.object().keys({
  searchString: Joi.string().min(1).max(30),
})

async function handler(req, res, next) {
  const response = await imdb.get('blabla', {
    ...req.joi,
  })

  return handleResponse(response)
}

module.exports = [
  joi(validations),
  serialize(handler),
]
