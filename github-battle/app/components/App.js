var React = require('react');
var Popular = require('./Popular');

//Three parts of a Component:
//1. State (optional, but nearly always has)
//2. Lifecycle methods (optional, but nearly always has)
//i.e. Allow you to hook into steps in the lifecycle
//of the component
//3. UI (not optional, otherwise no point of component)

class App extends React.Component {
	render() {
		//JSX, gets compiled (by Babel) into
		//React.createElement("div", null, "Hello World!")
		//aka React.createElement(tag name, attributes, contents/children)
		return (
			<div className='container'>
				<Popular />
			</div>
		)
	}
}

module.exports = App;