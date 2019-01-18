import axios from 'axios';

const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`;


//The following mini-functions can be chained/stacked together

function getProfile (username) {
	return axios.get(`https://api.github.com/users/${username}${params}`)
		// .then((user) => user.data);
		//the above, using destructuring
		.then(({data}) => data);
}

function getRepos (username) {
	return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount (repos) {
	return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos){
	return(followers * 3) + getStarCount(repos);
}

function handleError(error ){
	console.warn(error);
	return null;
}

function getUserData (player){
	return Promise.all([
		getProfile(player),
		getRepos(player)
	//this data will be array containing 
	//profile at index 0 and repos at index 1
	]).then(([profile, repos]) => ({
		//actually, destructuring allowed us to pass in
		//arguments array so deleted these
		//var profile = data[0];
		//var repos = data[1];
			profile,
			score: calculateScore(profile,repos)
		}));
}

function sortPlayers (players) {
	return players.sort((a,b) => b.score - a.score)
}

export function battle(players){
	return Promise.all(players.map(getUserData))
		.then(sortPlayers)
		.catch(handleError)
}

export function fetchPopularRepos(language){
	var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
	
	return axios.get(encodedURI)
		.then(( data ) => data.items)
}
