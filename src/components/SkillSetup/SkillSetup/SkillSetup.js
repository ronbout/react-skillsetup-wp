import React, { Component } from "react";
import SkillSearchContainer from "../../search/SkillSearch/";
import SkillCrudContainer from "../SkillCrud/";
import dataFetch from "../../../assets/js/dataFetch";
import getSkillsFromTree from "../getSkillsFromTree";

import "./css/skillSetup.css";

const API_SKILLS = "skills";

class SkillSetup extends Component {
	constructor(props) {
		super(props);

		const startMode = 0;
		this.state = {
			editMode: startMode, // used for SkillSearch so it knows what to do on dblClick
			// 0-Empty Skill, 1-Edit Techtags, 2-Parent Skills, 3-Child Skills
			skillInfo: "",
			relatedSkill: "",
			errMsg: "",
			dragSkill: false,
			forceRefresh: true, // this is just a toggle to force a Search re-render
			searchButton: this.getSearchButtonText(startMode),
			apiBase: window.apiUrl
		};
	}

	handleSkillSelect = skillInfo => {
		switch (this.state.editMode) {
			case 0:
				this.loadSkill(skillInfo);
				break;
			case 1:
				break;
			default:
				this.setState({
					relatedSkill: skillInfo
				});
		}
	};

	loadSkill = async skillInfo => {
		const endpoint = `${API_SKILLS}/${skillInfo.id}`;
		let result = await dataFetch(endpoint);
		if (result.error) {
			this.setState({
				errMsg: "An unknown error has occurred"
			});
			console.log(result);
		} else {
			// need to make a single array of all related skills
			// from the entire parent and child trees
			const treeList = getSkillsFromTree(result.parentTree, "parents").concat(
				getSkillsFromTree(result.childTree, "children")
			);
			this.setState({
				skillInfo: {
					...skillInfo,
					techtags: result ? (result.techtags ? result.techtags : []) : [],
					parentSkills: result.parentSkills,
					childSkills: result.childSkills,
					parentTree: result.parentTree,
					childTree: result.childTree,
					treeList
				}
			});
		}
	};

	handleChangeMode = editMode => {
		// this is for updates to the skill screen that change the search mode
		const skillInfo = editMode === 0 ? "" : this.state.skillInfo;
		const searchButton = this.getSearchButtonText(editMode);
		this.setState({
			skillInfo,
			relatedSkill: "",
			searchButton,
			editMode,
			forceRefresh: !this.state.forceRefresh
		});
	};

	getSearchButtonText = editMode => {
		switch (editMode) {
			case 2:
				return "Add Parent Skill";
			case 3:
				return "Add Child Skill";
			default:
				return "Edit Skill";
		}
	};

	handleSkillStartDrag = skillInfo => {
		this.setState({
			dragSkill: skillInfo
		});
	};

	render() {
		return (
			<main
				className="container-fluid fs-main bg-highlight"
				style={{ display: "flex", padding: "0.5rem" }}
			>
				<section className="skill-setup">
					<div className="tab-section">
						<SkillCrudContainer
							skillInfo={this.state.skillInfo}
							relatedSkill={this.state.relatedSkill}
							handleChangeMode={this.handleChangeMode}
							dragSkill={this.state.dragSkill}
						/>
					</div>
				</section>
				<SkillSearchContainer
					editMode={this.state.editMode}
					searchButton={this.state.searchButton}
					forceRefresh={this.state.forceRefresh}
					handleSkillSelect={this.handleSkillSelect}
					handleSkillStartDrag={this.handleSkillStartDrag}
				/>
			</main>
		);
	}
}

export default SkillSetup;
