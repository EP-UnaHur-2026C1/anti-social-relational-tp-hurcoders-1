'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    static associate(models) {

    }
  }

  PostImage.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PostImage',
    tableName: 'post_image'
  });

  return PostImage;
};
