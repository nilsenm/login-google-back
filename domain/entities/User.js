class User {
    constructor({ id, email, password, name, googleId, createdAt }) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
      this.googleId = googleId;
      this.createdAt = createdAt || new Date();
    }
  
    isGoogleUser() {
      return !!this.googleId;
    }
  
    validate() {
      if (!this.email) throw new Error('Email is required');
      if (!this.isGoogleUser() && !this.password) {
        throw new Error('Password is required for non-Google users');
      }
      return true;
    }
  }
  
  module.exports = User;