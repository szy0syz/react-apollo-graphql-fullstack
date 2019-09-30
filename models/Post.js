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
