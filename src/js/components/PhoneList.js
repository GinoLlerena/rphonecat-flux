var React = require("react");
var Phone = require("./Phone");

var PhonesList = React.createClass({
   propTypes: {
            phones: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
  
  render: function() {
    
     var phones = this.props.phones.map(function(phone, i){
      return <Phone phone={phone} key={i} />
    });
        
    return (
      <ul className="phones">
        {phones}
      </ul>
    )
  }
});

module.exports = PhonesList;