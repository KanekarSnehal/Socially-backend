const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');

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
            allowNull: false
        }
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
    },
    deleted_at:{
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
});