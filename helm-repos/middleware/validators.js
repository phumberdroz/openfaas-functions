const yup = require('yup');
const errors = require('../utils/errors');

const helmRepoSchema = yup.object().shape({
  url: yup.string().url().required(),
  name: yup.string().required(),
});

function helmRepoRequestValidator(req, res, next) {
  helmRepoSchema.validate(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400);
      res.json({
        errorMessage: err.message,
        errorCode: err.name,
      });
    });
}
function repoIdRequestParamValidator(req, res, next) {
  const uuidv4Regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  if (uuidv4Regex.test(req.params.repoId)) {
    next();
  } else {
    throw new errors.HelmRepoNotFound(`Helm reposistory ${req.params.repoId} not found. You need to provide an uuidv4.`);
  }
}
module.exports = {
  repoIdRequestParamValidator,
  helmRepoRequestValidator,
};
