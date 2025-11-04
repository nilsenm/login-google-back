const bcrypt = require('bcryptjs');

class BcryptHasher {
  async hash(password) {
    return bcrypt.hash(password, 10);
  }

  async compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = BcryptHasher;