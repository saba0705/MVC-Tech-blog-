const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./comment'); // Change the import statement to use the correct casing

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });

Blog.belongsTo(User, {
    foreignKey: 'user_id'
    });

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    });

Comment.belongsTo(User, {
    foreignKey: 'user_id'
    });

module.exports = { User, Blog, Comment };