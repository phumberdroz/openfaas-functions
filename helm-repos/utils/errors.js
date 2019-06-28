class UniqueConstraintValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.errorCode = 'UniqueConstraintValidationError';
    this.expose = true;
  }
}

class HelmRepoNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.errorCode = 'HelmRepoNotFound';
    this.expose = true;
  }
}
module.exports = {
  UniqueConstraintValidationError,
  HelmRepoNotFound,
};
