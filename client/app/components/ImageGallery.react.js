var React = require("react");
var PhoneImageActions = require("../actions/PhoneActions")
var PhoneImageStore = require("../stores/PhoneImageStore");

var ImageGallery = React.createClass({

  handleClick: function(e) {
    console.log(e.target.src);
    PhoneImageActions.handleThumbClick(e.target.src);
  },

  render: function() {

    var images = this.props.images.map(function(image_path, i) {
      return <li key={i}><img src={image_path} /> </li>;
    });

    return (
      <ul className="phone-thumbs" onClick={this.handleClick} >
        {images}
      </ul>
    )
  }
});

module.exports = ImageGallery;
