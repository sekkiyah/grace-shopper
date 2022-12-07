const { UnauthorizedError, UnauthorizedUserError } = require('./errors');
const jwt = require('jsonwebtoken');

function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401).send({
      error: 'Unauthorized',
      name: 'UnauthorizedError',
      message: UnauthorizedError(),
    });
  } else {
    next();
  }
}

function requireAdmin(req, res, next) {
  if (!req.user) {
    res.status(401).send({
      error: 'Unauthorized',
      name: 'UnauthorizedError',
      message: UnauthorizedError(),
    });
  }

  const { role } = jwt.verify(req.token, process.env.JWT_SECRET);

  if (role !== 'admin') {
    res.status(403).send({
      error: 'Unauthorized user',
      name: 'UnauthorizedUserError',
      message: UnauthorizedUserError(req.user.username),
    });
  } else {
    next();
  }
}

module.exports = {
  requireUser,
  requireAdmin,
};
