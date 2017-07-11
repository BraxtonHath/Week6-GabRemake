'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    user_id: DataTypes.INTEGER,
    gab_id: DataTypes.INTEGER
  }, {});

  Like.associate = function(models) {
    Like.belongsToMany(models.user, {as: 'users', through: 'Likes', foreignKey: 'user_id'});
    Like.belongsToMany(models.Mailbox, {as: 'message', through: 'Likes', foreignKey: 'gab_id'});
  };

  return Like;
};
