function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401).send({
      error: 'Unauthorized user',
      name: 'UnauthorizedUserError',
      message: 'Unauthorized user',
    });
  }

  next();
}

module.exports = {
  requireUser,
};