/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 22:43:45
 * @LastEditTime: 2019-09-15 22:30:03
 * @LastEditors: Please set LastEditors
 */
const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  body: String,
  username: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
}, { timestamps: true });

PostSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

PostSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

module.exports = model('Post', PostSchema);
