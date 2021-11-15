const { InternalServerException } = require('../exceptions');
const {
  InvalidCredentialsException,
} = require('../exceptions/auth.exceptions');
const { User } = require('../models');

function makeAuthService({
  comparePassword,
  createAccessToken,
  checkAccessToken,
}) {
  async function loginUser({ email, password }) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (!comparePassword(user.password, password)) {
      throw new InvalidCredentialsException();
    }

    const token = await createAccessToken(user.id);

    return {
      token,
    };
  }

  return {
    loginUser,
  };
}

module.exports = makeAuthService;
