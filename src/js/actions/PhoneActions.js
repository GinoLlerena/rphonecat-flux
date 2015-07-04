var request = require('superagent');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var PhoneCatConstants = require('../constants/PhoneCatConstants');


var PhoneActions = {

  handleSearch: function(query, order) {
   AppDispatcher.dispatch({
     actionType: PhoneCatConstants.PHONECAT_SEARCH,
     query: query,
     order: order
   });
 },

  handleThumbClick: function(imagen) {
   AppDispatcher.dispatch({
     actionType: PhoneCatConstants.PHONECAT_HANDLE_THUMBCLICK,
     imagen: imagen
   });
 }


};


module.exports = PhoneActions;
