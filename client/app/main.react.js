var React = require("react");
var ReactDOM = require('react-dom');
var PhoneCatWrapper = require("./components/PhoneCatWrapper.react");
var PhoneDetailsWrapper = require("./components/PhoneDetailsWrapper.react")
var ReactRouter = require("react-router");

var Router = ReactRouter.Router
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var IndexRoute = ReactRouter.IndexRoute;;
var Link = ReactRouter.Link;

require('../assets/styles/style.less');



var App = React.createClass({
  render: function(){
    return(
      <div>
        <ul>
          <li><Link to="phones">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

var routes = (
        <Route path="/" component={App}>
            <IndexRoute component={PhoneCatWrapper}/>
            <Route path="phones" component={PhoneCatWrapper}/>
            <Route path="phone/:phoneId" component={PhoneDetailsWrapper} />
        </Route>
    );



window.onload = function(){
  try{
    ReactDOM.render(<Router >{routes}</Router>, document.getElementById('app'));
  }catch(e){
    console.log(e.stack);
  }
};
