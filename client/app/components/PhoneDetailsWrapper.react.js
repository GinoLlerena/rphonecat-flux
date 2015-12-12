var React = require("react");
var PhoneDetailsActions = require("../actions/PhoneActions");
var PhoneDetailsStore = require("../stores/PhoneDetailsStore");
var PhoneDetails = require("./PhoneDetails.react");


function getPhoneState() {
  return {
    phone : PhoneDetailsStore.get(),
    active_image : ''
  };
};

var PhoneDetailsWrapper = React.createClass({

  getInitialState:function(){
    console.log(this.props.params.phoneId);
    PhoneDetailsStore.loadPhone(this.props.params.phoneId);
    return getPhoneState();
  },

  componentDidMount: function() {
      PhoneDetailsStore.addChangeListener(this._onChange);
   },

   componentWillMount: function() {
     PhoneDetailsStore.removeChangeListener(this._onChange);
   },

  render: function() {
    return (
           <PhoneDetails phone={this.state.phone} active_image={this.state.active_image} />
    )
  },

  _onChange: function(phoneId) {
    this.setState(getPhoneState());
  }

});



module.exports = PhoneDetailsWrapper;
