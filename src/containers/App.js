import React, { Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchField: ''
		};
	}

	componentDidMount() {
		const url = 'https://jsonplaceholder.typicode.com/users';
		
		fetch(url)
			.then((response) => response.json())
			.then((users) => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	}

	render() {
		const {robots, searchField} = this.state;
		const filteredRobots = robots.filter((robot) => 
			robot.name.toLowerCase().includes(searchField.toLowerCase())
		);

		if (!robots.length) {
			return (
				<h1>Loading...</h1>
			);
		}
		
		return (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox onSearchChange={this.onSearchChange} />
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}	
}

export default App;