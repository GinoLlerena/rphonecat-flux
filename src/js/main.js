var React = require("react/addons");
var PhoneCatWrapper = require("./components/PhoneCatWrapper");
var PhoneDetailsWrapper = require("./components/PhoneDetailsWrapper")
var ReactRouter = require("react-router");

var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;



var App = React.createClass({
  render: function(){
    return(
      <div>
        <ul>
          <li><Link to="phones">Home</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    )
  }
})

var routes = (
        <Route  handler={App}>
            <DefaultRoute handler={PhoneCatWrapper}/>
            <Route name="phones" handler={PhoneCatWrapper}/>
            <Route name="phone" path="/phones/:phoneId" handler={PhoneDetailsWrapper} />
        </Route>
    );


ReactRouter.run(routes, function(Handler) {
      console.log(Handler);
      React.render(<Handler />, document.getElementById('app'));
});
