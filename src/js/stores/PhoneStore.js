var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PhoneActions = require("../actions/PhoneActions");
var assign = require('object-assign');
var PhoneCatConstants = require('../constants/PhoneCatConstants');
var request = require('superagent');

var CHANGE_EVENT = 'change';

var phones = [];
var listPhones = [];

function persistPhones(response) {
    phones = response;
    listPhones = response;
};


var PhoneStore =  assign({}, EventEmitter.prototype, {

    loadPhones : function () {
      request.get('../../phones/phones.json', function(err, response) {
            if (response.ok) {
                console.log("dispatch");
                AppDispatcher.dispatch({
                  actionType: PhoneCatConstants.PHONECAT_LOAD_COMPLETE,
                  body: response.body
                });
            } else {
                AppDispatcher.dispatch({
                  actionType: PhoneCatConstants.PHONECAT_LOAD_FAIL,
                  error: response.error
                });
            }
        });
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    handleLoad: function (data){
        console.log(data);
    },

    onHandleSearch: function(filter_text, sort_by) {

      var filtered = $.grep(listPhones, function(phone) {
          return phone.name.toLowerCase().indexOf(filter_text) > -1;
        });

      console.log(sort_by);

      var sorted = filtered.sort(function(a, b) {
          if(sort_by === 'name')
            return a.name.localeCompare(b.name)
          else
            return a.age - b.age
        });

       phones = sorted;
    },

   getAll: function() {
     return phones;
   },

});


PhoneStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case PhoneCatConstants.PHONECAT_SEARCH:
      var query = action.query.trim();
      var order = action.order.trim();
      if (query !== '' || order !== '') {
        PhoneStore.onHandleSearch(query, order);
        PhoneStore.emitChange();
      }
      break;

    case PhoneCatConstants.PHONECAT_LOAD_COMPLETE:
      var body = action.body;
      persistPhones(body);
      PhoneStore.emitChange();
      break;

    case PhoneCatConstants.PHONECAT_LOAD_FAIL:
      var error = action.error;
      PhoneStore.emitChange();
      break;

    default:
      // no op
  }
});


module.exports = PhoneStore;
