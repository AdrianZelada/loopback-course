
module.exports = {
  sendError: function(next, message) {
    var error = new Error();
    error.status = 412; // Tp3HttpInterceptor
    error.message = message || 'invalid-office';
    next(error);
  },
}
