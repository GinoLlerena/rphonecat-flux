/** @jsx React.DOM */
var React = require("react");

var PhonesList = require("./PhoneList")
var SearchForm = require("./SearchForm")

var PhoneCat = React.createClass({
  render: function() {

    return (
      <div className="row">
        <div className="col-md-2">
          <SearchForm filter_text={this.props.filter_text} sort_by={this.props.sort_by} />
        </div>
        <div className="col-md-10">
          <PhonesList phones={this.props.phones} />
        </div>
      </div>
    )
  }
});

module.exports = PhoneCat;
