import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import './App.css';

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		isPending: state.requestRobots.isPending,
		robots: state.requestRobots.robots,
		error: state.requestRobots.error
	};
}

// dispatch the DOM changes to call an action.
// mapStateToProps returns object, mapDispatchToProps returns function.
// the function returns an object then uses connect to change the data from reducers.
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	};
}

class App extends Component {
	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter((robot) => 
			robot.name.toLowerCase().includes(searchField.toLowerCase())
		);

		if (isPending) {
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