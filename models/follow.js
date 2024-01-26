const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');
const User = require('./user');

const Follow = sequelize.define('Follow', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
    },
    current_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'User',
            key: 'id'
        },
        allowNull: false
    },
    following_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'User',
            key: 'id'
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

User.hasMany(Follow, { foreignKey: 'current_user' });
Follow.hasMany(User, { foreignKey: 'current_user', as: 'following' });

User.hasMany(Follow, { foreignKey: 'following_user' });
Follow.hasMany(User, { foreignKey: 'following_user', as: 'follower' });

module.exports = Follow;