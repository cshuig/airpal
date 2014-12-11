/**
 * UserStore
 */

var StoreDefaults = require('./StoreDefaults');
var UserDispatcher = require('../dispatchers/UserDispatcher');
var UserConstants = require('../constants/UserConstants');

/* Store helpers */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

/**
 * User object
 */
var defaultUser = {
  name: 'unknown',
  executionPermissions: {
    accessLevel: 'default',
    canCreateCsv: false,
    canCreateTable: false
  }
};

var _user = _.extend({}, defaultUser);

/**
 * Adds the user to the user object
 * @param {object} raw user object
 */
function _addUser(user) {
  _user = user;
}

var UserStore = assign(StoreDefaults, EventEmitter.prototype, {

  /**
   * Get the current user
   * @return {object} the user object
   */
  getCurrentUser: function() {
    return _user;
  }

});

UserStore.dispatchToken = UserDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case UserConstants.RECEIVED_USER_INFO:
      _addUser(action.user);
      UserStore.emitChange('add');
      UserStore.emitChange('change');
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
