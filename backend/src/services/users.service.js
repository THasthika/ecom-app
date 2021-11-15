const { InternalServerException } = require('../exceptions');
const {
  UserAlreadyExistsException,
  UserNotFoundException,
} = require('../exceptions/users.exceptions');
const { User } = require('../models');

function filteredUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function makeUsersService({ hashPassword, comparePassword }) {
  async function createUser({ name, email, password }) {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    // hash password
    const passwordHash = hashPassword(password);

    const user = await User.create({ name, email, password: passwordHash });
    return filteredUser(user);
  }

  async function getUserById(id) {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    return filteredUser(user);
  }

  async function deleteUser(id) {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    const rows = await User.destroy({
      where: {
        id: id,
      },
    });
    if (rows == 1) {
      return filteredUser(user);
    } else if (rows == 0) {
      throw new UserNotFoundException();
    } else {
      throw new InternalServerException();
    }
  }

  async function updateUser(id, { name, email, password }) {
    const updateObject = {};
    if (!!name) {
      updateObject.name = name;
    }
    if (!!email) {
      updateObject.email = email;
    }
    if (!!password) {
      updateObject.password = hashPassword(password);
    }
    const rows = await User.update(updateObject, {
      where: {
        id: id,
      },
    });

    if (rows == 1) {
      return filteredUser(await User.findOne({ where: { id: id } }));
    } else if (rows == 0) {
      throw new UserNotFoundException();
    } else {
      throw new InternalServerException();
    }
  }

  return {
    createUser,
    getUserById,
    deleteUser,
    updateUser,
  };
}

module.exports = makeUsersService;
