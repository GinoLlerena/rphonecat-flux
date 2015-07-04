var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

var Phone = React.createClass({
  render: function() {
    var phone = this.props.phone;
    console.log(phone);
    return (
      <li className="thumbnail phone-listing">
      <Link to="phone" params={{phoneId: phone.id}} className="thumb" >
        <img src={phone.imageUrl} />
     </Link>
     <Link to="phone" params={{phoneId: phone.id}} >
       {phone.name}
     </Link>
        <p>{phone.snippet}</p>
      </li>
    )
  }
});

module.exports = Phone;
