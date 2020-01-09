import React, { Component } from "react";

import CompanySearch from "./CompanySearch";
import dataFetch from "../../../assets/js/dataFetch";

const API_COMPANY_SEARCH = "companies/search";

class CompanySearchContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formFields: {
				searchName: "",
				searchEmail: "",
				searchPhone: ""
			},
			results: [],
			companySelect: 0,
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

		let result = await dataFetch(API_COMPANY_SEARCH, apiQuery);
		if (result.error) {
			console.log("Fetch error: ", result);
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

	handleCompanyClick = (ndx, event) => {
		this.setState({
			companySelect: ndx
		});
	};

	handleSelect = ndx => {
		this.props.handleCompanySelect &&
			this.props.handleCompanySelect(
				this.state.results[this.state.companySelect]
			);
	};

	render() {
		return (
			<CompanySearch
				state={this.state}
				handleInputChange={this.handleInputChange}
				handleSearch={this.handleSearch}
				handleCompanyClick={this.handleCompanyClick}
				handleSelect={this.handleSelect}
				{...this.props}
			/>
		);
	}
}

export default CompanySearchContainer;
