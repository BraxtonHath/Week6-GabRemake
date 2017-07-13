'use strict';
module.exports = function(sequelize, DataTypes) {
  var Mailbox = sequelize.define('Mailbox', {
    message: DataTypes.STRING,
  },{});

  Mailbox.associate = function(models) {
    //connection to many
    Mailbox.belongsToMany(models.user, {as: 'userLikes', through: 'Likes', foreignKey: 'gab_id', onDelete: 'cascade', hooks: true});
    //connection to one
    Mailbox.belongsTo(models.user, {as: 'users', foreignKey: 'user_id', onDelete: 'cascade', hooks: true});
  };


  Mailbox.prototype.ownersDelete = function() {
    return function (val, render) {
      const id = render(val);
      if (id == this.user_id) {
        // render the delete button
        return render( '<form class="" action="/delete/{{id}}" method="post"><input type="submit" name="delete" value="Delete" id="{{id}}">  </form>');
      }
    };
  };


  return Mailbox;
};
