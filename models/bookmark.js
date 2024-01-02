const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');

const Bookmark = sequelize.define('Bookmark', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'id'
        }
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

module.exports = Bookmark;