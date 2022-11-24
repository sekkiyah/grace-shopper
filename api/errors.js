module.exports = {
  UnauthorizedError: () => 'You must be logged in to perform this action',
  UnauthorizedUserError: username => `User ${username} is not authorized to make this update`,
  UserDoesNotExistError: username => `User ${username} does not exist`,
  UsernameTakenError: username => `Username ${username} is already taken.`,
  EmailTakenError: email => `Email ${email} is already taken.`,
};
