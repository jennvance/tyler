var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
	return(
		<ul className='languages'>
			
			{languages.map(function (lang) {
				return (
					<li 
						style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
						onClick={props.onSelect.bind(null, lang)} 
						key={lang}>
						{lang}
					</li>

				)
			//the second arg passed to map, this,
			//is the context you want function to be invoked in
			//You don't need the second arg
			//if you use ES6 Arrow Functions, bc
			//they make it so context is same as the one
			//on outside of function
			//acutally, removed bc moved out of class
			//}, this)}
			})}
		</ul>
	)
}

//Don't need this anymore bc moved it into SelectLanguage,
//which is a stateless functional component

// class SelectLanguage extends React.Component {
// 	render() {
		
// 		return (

// 		)
// 	}
// }

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			selectedLanguage: 'All'
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}
	//update state
	updateLanguage(lang){
		this.setState(function () {
			return {
				selectedLanguage: lang
			}
		});

	}

	render() {
		
		return (
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
			</div>

		)
	}
}

module.exports = Popular;