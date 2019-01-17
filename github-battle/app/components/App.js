var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');


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
			<Router>
				<div className='container'>
					<Nav />

				    <Switch>
			            <Route exact path='/' component={Home} />
			            <Route exact path='/battle' component={Battle} />
			            <Route path='/popular' component={Popular} />
			            <Route render={function () {
			              return <p>Not Found</p>
			            }} />
			        </Switch>
				</div>
			</Router>
		)
	}
}

module.exports = App;