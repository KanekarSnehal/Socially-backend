const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');
const Post = require('./post');
const User = require('./user');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'Post',
            key: 'id',
        },
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'User',
            key: 'id',
        },
        allowNull: false
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    }
});

Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'comments' });
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });

User.hasMany(Comment, { foreignKey: 'created_by' });
Comment.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = Comment;