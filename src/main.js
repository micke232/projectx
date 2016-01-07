const React = require("react");
const ReactDOM = require("react-dom");

require("./sass/style.scss");
var SuperDiv = React.createClass({
	
	render: function(){
		return (
		<li>{this.props.hello}</li>
		)
	}
	
});


var App = React.createClass({
	
	initialState: function(){
		return 2;
	},
	
	render: function() {
		return (
			<div>hello world ahahathis is the pprops: <SuperDiv hello={this.props.x}/></div>
		);
	}
});
 

function render(){
	var x = 12;
	var doc = document.getElementById("app")
	ReactDOM.render(<App x={x}/>, doc);
}


render();
