const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
  ],
});

userSchema.pre("save", function (next) {
  const users = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) return next(saltError);
      else {
        bcrypt.hash(users.password, salt, function (hashError, hash) {
          if (hashError) return next(hashError);
          users.password = hash;
          next();
        });
      }
    });
  } else return next();
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password).then((res) => {
    return res;
  });
};

userSchema.virtual("disponible").get(function () {
  return this.mentees.length < this.maxMentees;
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;