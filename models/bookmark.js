const sequelize = require('../connections/mysql');
const { DataTypes } = require('sequelize');
const Post = require('./post');
const User = require('./user');

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
    }
});

Bookmark.belongsTo(Post, { foreignKey: 'post_id' });
Post.hasMany(Bookmark, { foreignKey: 'post_id', onDelete: 'CASCADE' });

Bookmark.belongsTo(User, { foreignKey: 'created_by', as: 'bookmarked_by' });
User.hasMany(Bookmark, { foreignKey: 'created_by', onDelete: 'CASCADE' });

module.exports = Bookmark;