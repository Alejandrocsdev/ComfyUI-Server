exports.cors = require('./cors');
exports.notFound = require('./notFound');
exports.asyncHandler = require('./asyncHandler');
exports.errorHandler = require('./errorHandler');
exports.authenticate = require('./authenticate');

const { googleAuth, googleCallback, passportInit } = require('./passport');
exports.googleAuth = googleAuth;
exports.googleCallback = googleCallback;
exports.passportInit = passportInit;
