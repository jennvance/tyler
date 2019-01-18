const React = require('react');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Results = require('./Results');


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
			            <Route path='/battle/results' component={Results} />
			            <Route path='/popular' component={Popular} />
			            <Route render={() => <p>Not Found</p>} />
			        </Switch>
				</div>
			</Router>
		)
	}
}

module.exports = App;