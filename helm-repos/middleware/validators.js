const yup = require('yup');

const helmRepoSchema = yup.object().shape({
  url: yup.string().url(),
  name: yup.string(),
});


async function helmRepoRequestValidator(req, res, next) {
  try {
    await helmRepoSchema.validate(req);
  } catch (error) {
    throw error
  }
  next();
}

module.exports = {
  helmRepoRequestValidator,
}
;