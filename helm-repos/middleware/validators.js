const yup = require('yup');

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

module.exports = {
  helmRepoRequestValidator,
};
