import React, { Component } from "react";

import PersonSearch from "./PersonSearch";
import dataFetch from "../../../assets/js/dataFetch";

const API_PERSON_SEARCH = "persons/search";

class PersonSearchContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formFields: {
				searchName: "",
				searchEmail: "",
				searchPhone: ""
			},
			results: [],
			personSelect: 0,
			loading: false,
			apiBase: window.apiUrl
		};
	}
	handleInputChange = event => {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;

		this.setState({
			formFields: {
				...this.state.formFields,
				[target.name]: value
			}
		});
	};

	handleSearch = async event => {
		event && event.preventDefault();
		this.setState({
			loading: true
		});
		let apiQuery = "";
		// add the query parameters to apiQuery string
		if (this.state.formFields.searchName) {
			apiQuery += `&name=${this.state.formFields.searchName}`;
		}
		if (this.state.formFields.searchEmail) {
			apiQuery += `&email=${this.state.formFields.searchEmail}`;
		}
		if (this.state.formFields.searchPhone) {
			apiQuery += `&phone=${this.state.formFields.searchPhone}`;
		}
		const endpoint = API_PERSON_SEARCH;
		const result = await dataFetch(endpoint, apiQuery);
		if (result.error) {
			console.log("Error searching for Person: ", result);
			this.setState({ loading: false });
		} else {
			this.setState({
				results: result ? result : [],
				loading: false
			});
		}
	};

	handleKeyPress = event => {
		if (event.key === "Enter") {
			event && event.preventDefault();
			this.handleSearch();
		}
	};

	handlePersonClick = (ndx, event) => {
		this.setState({
			personSelect: ndx
		});
	};

	handleSelect = ndx => {
		//console.log(this.state.results[this.state.personSelect]);
		this.props.handlePersonSelect &&
			this.props.handlePersonSelect(
				this.state.results[this.state.personSelect]
			);
	};

	render() {
		return (
			<PersonSearch
				state={this.state}
				handleInputChange={this.handleInputChange}
				handleSearch={this.handleSearch}
				handlePersonClick={this.handlePersonClick}
				handleSelect={this.handleSelect}
				{...this.props}
			/>
		);
	}
}

export default PersonSearchContainer;
