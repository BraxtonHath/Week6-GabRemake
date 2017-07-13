'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  user.associate = function(models) {
    user.hasMany(models.Mailbox, {as: 'message', foreignKey: 'user_id', onDelete: 'cascade', hooks: true});
    user.belongsToMany(models.Mailbox, {as: 'MailboxLikes', through: 'Likes', foreignKey: 'user_id', onDelete: 'cascade', hooks: true});
  };


  return user;
};
