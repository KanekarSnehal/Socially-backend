const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');
const Post = require('./post');
const User = require('./user');

const Like = sequelize.define('Like', {
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

Like.belongsTo(Post, { foreignKey: 'post_id', as: 'likes' });
Post.hasMany(Like, { foreignKey: 'post_id', as: 'likes' });

Like.belongsTo(User, { foreignKey: 'created_by', as: 'liked_by'});
User.hasMany(Like, { foreignKey: 'created_by', as: 'liked_by'});

module.exports = Like;