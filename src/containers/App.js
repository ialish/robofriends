import React, { Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import { connect } from 'react-redux';
import { setSearchField } from '../actions';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchField
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	};
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: []
		};
	}

	componentDidMount() {
		const url = 'https://jsonplaceholder.typicode.com/users';
		
		fetch(url)
			.then((response) => response.json())
			.then((users) => this.setState({ robots: users }));
	}

	render() {
		const { robots } = this.state;
		const { searchField, onSearchChange } = this.props;
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
				<SearchBox onSearchChange={onSearchChange} />
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}	
}

// action done from mapDispatchToProps will change state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);