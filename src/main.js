const React = require("react");
const ReactDOM = require("react-dom");


var App = React.createClass({
	render: function() {
		return (
			<div>
				This shit is actually working? Olallala obladi oblada life goes on
			</div>
		);
	}
});


function render(){
	ReactDOM.render(<App />, document.getElementById("app"));
}


render();
