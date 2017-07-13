'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Mailboxes', 'user_id')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Mailboxes', 'user_id')
  }
};
