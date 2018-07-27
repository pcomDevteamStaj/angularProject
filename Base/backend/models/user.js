const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: function() {
      return this.userId != null;
    }
  },
  password: {
    type: String,
    required: function() {
      return this.userId != null;
    }
  },
  mail: {
    type: String,
    required: function() {
      return this.userId != null;
    }
  },
  tel: { type: String, required: false },
  title: { type: String, required: false },
  gender: { type: String, required: false }
});

module.exports = mongoose.model("Post", postSchema);
