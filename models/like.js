const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');
const Post = require('./post');
const User = require('./user');

const Likes = sequelize.define('Likes', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'Post',
            key: 'id'
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

Likes.belongsTo(Post, { foreignKey: 'post_id' });
Post.hasMany(Likes, { foreignKey: 'post_id', as: 'likes', onDelete: 'CASCADE' });

Likes.belongsTo(User, { foreignKey: 'created_by', as: 'liked_by' });
User.hasMany(Likes, { foreignKey: 'created_by', onDelete: 'CASCADE' });

module.exports = Likes;