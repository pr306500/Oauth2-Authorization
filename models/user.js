var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(next) {
console.log('this-->',JSON.stringify(UserSchema.methods));
  var user = this;


  // Break out if the password is new
  if (!user.isModified('password')) {
  console.log('hiiiiiiii');
    return next()

  };
  console.log('byeee');

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    console.log('salty',err,salt);
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {

      if (err) return next(err);
      user.password = hash;
      console.log('final stage',user);
      next(user);
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {

  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}
//http://blog.mongodb.org/post/34225138670/password-authentication-with-mongoose-part-2 must read this article
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
