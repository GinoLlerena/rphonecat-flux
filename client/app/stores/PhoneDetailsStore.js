var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PhoneActions = require("../actions/PhoneActions");
var assign = require('object-assign');
var PhoneCatConstants = require('../constants/PhoneCatConstants');
var request = require('superagent');

var CHANGE_EVENT = 'change';

function handleLoad(data){
    console.log(data);
};

var phone = {
      images: [],
      battery: {},
      storage: {},
      connectivity: {},
      android: {},
      sizeAndWeight: {
        dimensions: []
      },
      display: {},
      hardware: {},
      camera: {
        features: []
      }
};

function persistPhone(response) {
    phone = response;
};

var PhoneDetailsStore =  assign({}, EventEmitter.prototype, {

    loadPhone : function (phoneId) {
        request.get('/phones/' + phoneId + '.json', function(err, response) {
            if (response.ok) {
                console.log(response);
                AppDispatcher.dispatch({
                  actionType: PhoneCatConstants.PHONECAT_LOADDETAILS_COMPLETE,
                  body: response.body
                });
            } else {
                PhoneActions.load.failed(response.error);
                AppDispatcher.dispatch({
                  actionType: PhoneCatConstants.PHONECAT_LOADDETAILS_FAIL,
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

   get: function() {
        return phone;
    }
});

PhoneDetailsStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case PhoneCatConstants.PHONECAT_LOADDETAILS_COMPLETE:
      var body = action.body;
       persistPhone(body);
      PhoneDetailsStore.emitChange();
      break;

    case PhoneCatConstants.PHONECAT_LOADDETAILS_FAIL:
      var error = action.error;
      PhoneDetailsStore.emitChange();
      break;

    default:
      // no op
  }
});


module.exports = PhoneDetailsStore;
