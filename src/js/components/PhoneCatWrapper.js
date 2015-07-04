/** @jsx React.DOM */
 var React = require("react/addons");
 var PhoneCat = require("./PhoneCat");
 var PhoneStore = require("../stores/PhoneStore");
 var PhoneActions = require("../actions/PhoneActions");

 function getPhonesState() {
   return {
     phones: PhoneStore.getAll()
   };
 };

var PhoneCatWrapper = React.createClass({

  getInitialState: function() {
        PhoneStore.loadPhones();
        filter_text = '';
        sort_by = 'age';
        return getPhonesState();
    },

 componentDidMount: function() {
    PhoneStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PhoneStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log(this.state.phones);
    return (
      <PhoneCat phones={this.state.phones}  filter_text={this.state.filter_text} sort_by={this.state.sort_by} />
    )
  },

  _onChange: function() {
    this.setState(getPhonesState());
  }

});

module.exports = PhoneCatWrapper;
