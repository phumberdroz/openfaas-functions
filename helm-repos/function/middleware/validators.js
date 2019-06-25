const yup = require('yup');

const helmRepoSchema = yup.object().shape({
  url: yup.string().url(),
  name: yup.string(),
});


async function helmRepoRequestValidator(req, res, next) {
  await helmRepoSchema.validate(req);
  next();
}

module.exports = {
  helmRepoRequestValidator,
}
;