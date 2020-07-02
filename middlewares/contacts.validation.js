const Joi = require("@hapi/joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).alphanum().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "ru", "ua", "net"] },
    })
    .required(),
  phone: Joi.string().pattern(new RegExp("^[0-9]{8,16}$")).required(),
});

const UpdateContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).alphanum(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "ru", "ua", "net"] },
  }),
  phone: Joi.string().pattern(new RegExp("^[0-9]{8,16}$")),
});

const validate = async (schema, data) => {
  const { error } = await schema.validate(data);
  if (error) {
    const message = error.details.reduce((message, item) => {
      if (message) return `${message}, ${item.message}`;
      return `${message}`;
    }, "");
    throw new Error(message);
  }
};

const validateCreateContactMiddleware = async (req, res, next) => {
  try {
    await validate(createContactSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send(e.message);
    res.end();
    return;
  }
};

const validateUpdateContactMiddleware = async (req, res, next) => {
  try {
    await validate(UpdateContactSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send(e.message);
    res.end();
    return;
  }
};

module.exports = {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
};
