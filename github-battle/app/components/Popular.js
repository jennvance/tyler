const React = require('react');
const PropTypes = require('prop-types');
const { fetchPopularRepos } = require('../utils/api');
const Loading = require('./Loading');

function SelectLanguage({ selectedLanguage, onSelect }) {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
	return(
		<ul className='languages'>
			
			{languages.map((lang) => {
				return (
					<li 
						style={lang === selectedLanguage ? {color: '#d0021b'} : null}
						onClick={() => onSelect(lang)} 
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

function RepoGrid ({ repos }) {
	return (
		<ul className='popular-list'>
			{repos.map( ({name, stargazers_count, owner}, index) => {
				return (
					<li key={name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img
									className='avatar'
									src={owner.avatar_url}
									alt={'Avatar for ' + owner.login}
								/>
							</li>
							<li><a href={html_url}>{name}</a></li>
							<li>@{owner.login}</li>
							<li>{stargazers_count} stars </li>
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
		this.setState(() => ({
			selectedLanguage: lang,
			repos: null
		}));

		//AJAX reqs
		fetchPopularRepos(lang)
			.then((repos) => {
				this.setState(() => ({repos}))
			});
	}

	render() {
		const { selectedLanguage, repos } = this.state
		
		return (
			<div>
				<SelectLanguage 
					selectedLanguage={selectedLanguage}
					onSelect={this.updateLanguage} />
				{!repos
					? <Loading text='DOWNLOADING' speed={2}/>
					: <RepoGrid repos={repos} /> }
				
			</div>

		)
	}
}

module.exports = Popular;