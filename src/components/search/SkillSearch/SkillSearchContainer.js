/* SkillSearchContainer.js */
import React, { Component } from "react";

import SkillSearch from "./SkillSearch";
import dataFetch from "../../../assets/js/dataFetch";

const API_SKILL_SEARCH = "skills/search/";
const API_SKILLS = "skills";
const API_TAGS = "techtags";
const API_TAG_SKILLS = "techtag_skills/";

const clearFormFields = {
	formFields: {
		keyword: "",
		skillSelect: 0,
		tagSelect: -1
	}
};

class SkillSearchContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...clearFormFields,
			errMsg: "",
			userMsg: "",
			apiBase: window.apiUrl,
			tagOptions: [],
			openTagOptions: false,
			loading: true,
			closeBtn: this.props.closeBtn || false
		};
	}

	componentDidMount() {
		this.loadTechtags();
		this.handleSearch();
	}

	async loadTechtags() {
		let result = await dataFetch(API_TAGS);
		if (result.error) {
			console.log("Error retrieving techtags: ", result.error);
			result = [];
		}
		this.setState({
			tagOptions: result ? result : []
		});
	}

	componentDidUpdate(prevProps, prevState) {
		// auto refresh the search list
		// if forceRefresh, it is coming in from parent and needs
		// to wait for database update, hence the setTimeout
		if (
			this.props.forceRefresh &&
			this.props.forceRefresh !== prevProps.forceRefresh
		) {
			setTimeout(this.handleSearch, 800);
		}
	}

	handleSearch = async event => {
		event && event.preventDefault();
		this.setState({
			loading: true
		});
		let apiQuery = "";
		let skillApi;
		// 3 api possibilities: 1) no keyword, no techtag
		// 2) keyword, no techtag or keyword, techtag
		// 3) no keyword, techtag
		if (this.state.formFields.keyword) {
			// skills search api
			skillApi = API_SKILL_SEARCH + this.state.formFields.keyword;
			if (this.state.formFields.tagSelect > -1) {
				// add techtag to search url
				const techtagId = this.state.tagOptions[this.state.formFields.tagSelect]
					.id;
				apiQuery += "&techtag=" + techtagId;
			}
		} else if (this.state.formFields.tagSelect === -1) {
			// standard skills api
			skillApi = API_SKILLS;
		} else {
			// USE techtag_skills api
			const techtagId = this.state.tagOptions[this.state.formFields.tagSelect]
				.id;
			skillApi = API_TAG_SKILLS + techtagId;
		}

		const result = await dataFetch(skillApi, apiQuery);
		if (result.error) {
			console.log("Error searching for Skill: ", result);
			this.setState({ loading: false });
		} else {
			this.setState({
				skillOptions: result ? result : [],
				loading: false
			});
		}
	};

	handleInputChange = event => {
		// only 1 field: keyword
		const target = event.target;
		const value = target.value;
		let errs = {};
		this.setState({
			formFields: {
				...this.state.formFields,
				keyword: value
			},
			...errs
		});
	};

	handleSelect = () => {
		const selectSkillInfo = this.state.skillOptions[
			this.state.formFields.skillSelect
		];
		// if a prop was passed down to handle the skill select, call it
		this.props.handleSkillSelect &&
			this.props.handleSkillSelect(selectSkillInfo);
	};

	handleSkillClick = (ndx, event) => {
		this.setState({
			formFields: {
				...this.state.formFields,
				skillSelect: ndx
			}
		});
	};

	handleTagSelect = (ndx, event) => {
		if (this.state.formFields.tagSelect !== ndx) {
			this.setState(
				{
					formFields: {
						...this.state.formFields,
						tagSelect: ndx
					}
				},
				this.handleSearch
			);
		}
		this.handleTagSelectFocus();
	};

	handleDragStart = (skillInfo, ndx, event) => {
		const skillTxt = JSON.stringify(skillInfo);
		event.dataTransfer.setData("text/plain", skillTxt);
		this.handleSkillClick(ndx, event);
		this.props.handleSkillStartDrag(skillInfo);
		event.stopPropagation();
	};

	handleTagSelectFocus = () => {
		this.setState(prevState => {
			return { openTagOptions: !prevState.openTagOptions };
		});
	};

	render() {
		return (
			<SkillSearch
				state={this.state}
				handleSearch={this.handleSearch}
				handleInputChange={this.handleInputChange}
				handleSelect={this.handleSelect}
				handleSkillClick={this.handleSkillClick}
				handleTagSelect={this.handleTagSelect}
				handleDragStart={this.handleDragStart}
				handleTagSelectFocus={this.handleTagSelectFocus}
				{...this.props}
			/>
		);
	}
}

export default SkillSearchContainer;
