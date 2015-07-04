var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PhoneActions = require("../actions/PhoneActions");
var assign = require('object-assign');
var PhoneCatConstants = require('../constants/PhoneCatConstants');

var CHANGE_EVENT = 'change';

var PhoneImageStore =  assign({}, EventEmitter.prototype, {

    init: function() {
         active_image = ''
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

    onHandleThumbClick: function(image_path){
      console.log("Image Store : " +image_path);
      this.active_image = image_path;
    },

   get: function() {
        return this.active_image;
    }
});


PhoneImageStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case PhoneCatConstants.PHONECAT_HANDLE_THUMBCLICK:
        var imagen = action.imagen.trim();
        if (imagen !== '') {
          PhoneImageStore.onHandleThumbClick(imagen);
          PhoneImageStore.emitChange();
        }
      break;

    default:
      // no op
  }
});


module.exports = PhoneImageStore;
