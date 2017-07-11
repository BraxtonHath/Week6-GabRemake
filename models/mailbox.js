'use strict';
module.exports = function(sequelize, DataTypes) {
  var Mailbox = sequelize.define('Mailbox', {
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  },{});

  Mailbox.associate = function(models) {
//connection to many
    Mailbox.belongsToMany(models.Like, {as: 'likes', through: 'Likes', foreignKey: 'gab_id'});
//connection to one
    Mailbox.belongsTo(models.user, {as: 'users', foreignKey: 'user_id'});
  };


  return Mailbox;
};
