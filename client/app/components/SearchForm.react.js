var React = require("react");
var PhoneActions = require("../actions/PhoneActions");

var SearchForm = React.createClass({


	onChangeHandler: function() {
		    var query = this.refs.query.value.trim();
		    var order = this.refs.order.value;
		    PhoneActions.handleSearch(query, order);
		  },

	render : function () {
		return (
			<div>
		        Search:
		        <input type="text"
										ref="query"
										onChange={this.onChangeHandler} />
		        Sort by:
		        <select ref="order" onChange={this.onChangeHandler}>
		          <option value="name">Alphabetical</option>
		          <option value="age">Newest</option>
		        </select>
		      </div>
		)
	}
});

module.exports = SearchForm;
