'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {

    }
  }

  Post.init({
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'post',
  });

  return Post;
};
