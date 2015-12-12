
 var React = require("react");
 var PhoneCat = require("./PhoneCat.react");
 var PhoneStore = require("../stores/PhoneStore");
 var PhoneActions = require("../actions/PhoneActions");

 function getPhonesState() {
   return {
     phones: PhoneStore.getAll(),
     filter_text : '',
     sort_by : 'age'
   }
 };

var PhoneCatWrapper = React.createClass({

  getInitialState: function() {

        return getPhonesState();
    },

  componentDidMount(){
    PhoneStore.loadPhones();
  },

 componentWillMount: function() {
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
