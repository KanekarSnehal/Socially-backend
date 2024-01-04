const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');
const User = require('./user');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    description: DataTypes.STRING,
    like_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    comment_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
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
    },
    updated_at: {
        type: 'TIMESTAMP',
    }
});

User.hasMany(Post, { foreignKey: 'created_by', as: 'creator' });
Post.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = Post;