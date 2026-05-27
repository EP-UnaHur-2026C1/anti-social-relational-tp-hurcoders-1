"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {}
  }

  Tag.init(
    {
      content_tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },

    {
      sequelize,
      modelName: "Tag",
      tableName: "tag",
      timestamps: false,
    },
  );

  return Tag;
};
