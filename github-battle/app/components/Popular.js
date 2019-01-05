var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

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

function RepoGrid (props) {
	return (
		<ul className='popular-list'>
			{props.repos.map(function (repo, index){
				return (
					<li key={repo.name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img
									className='avatar'
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login}
								/>
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars </li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}


	//update state
	updateLanguage(lang){
		this.setState(function () {
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		//AJAX reqs
		api.fetchPopularRepos(lang)
			.then(function(repos) {
				this.setState(function () {
					return {
						repos: repos
					}
				});
			}.bind(this));

	}

	render() {
		
		return (
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage} />
				{!this.state.repos
					? <p>LOADING</p>
					: <RepoGrid repos={this.state.repos} /> }
				
			</div>

		)
	}
}

module.exports = Popular;