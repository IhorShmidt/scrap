'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    mongoose.Promise = require('bluebird');

const newsModel = new Schema({
  postId: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

//do we need this ?
// post.set('toJSON', {
//   transform: function(doc, ret, options) {
//     ret.id = ret._id.toString();
//     return ret;
//   }
// });

module.exports = mongoose.model('newsModel', newsModel);