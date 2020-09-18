const Joi = require('@hapi/joi')

module.exports = function useJoi(schema) {
  function validate(req, res, next) {
    var data = Object.assign({}, req.body, req.query, req.params)
    const { err, value } = schema.validate(data)

    if(err) {
      const [error] = err.details
      const namespace = ['@validation', 'error']

      return res
        .status(422)
        .json({
          message: namespace.concat(error.path).concat(error.type).join('.'),
          details: error.context,
          error: error.message,
        })
    }
    req.joi = value
    return next()
  }
  return validate
}
