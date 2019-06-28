// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err.expose === true) {
    res.status(err.statusCode || 500);
    res.json({
      errorMessage: err.message,
      errorCode: err.errorCode,
    });
  } else {
    res.status(500);
    res.json({
      errorMessage: 'Something went wrong',
      errorCode: 'UNKNOWN',
    });
  }
}

module.exports = {
  errorHandler,
};
