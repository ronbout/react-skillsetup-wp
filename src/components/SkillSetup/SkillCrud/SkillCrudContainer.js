/* SkillCrudContainer.js */
import React, { Component } from "react";
import SkillCrudForm from "./SkillCrudForm";
import UserModalMsg from "components/UserModalMsg";
import { objCopy, deepCompare } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";
import { isEmptyObject } from "assets/js/library";
import Snackbar from "styledComponents/Snackbar";
import getSkillsFromTree from "../getSkillsFromTree";

const API_SKILL = "skills";
const API_RELATED_SKILLS = "skill/relatedtree";
const TECHTAGS_NDX = 0;
const PSKILLS_NDX = 1;
const CSKILLS_NDX = 2;

const clearFormFields = {
	formFields: {
		id: "",
		name: "",
		description: "",
		url: "",
		techtags: [],
		parentSkills: [],
		childSkills: [],
		parentTree: [],
		childTree: [],
		treeList: [],
	},
};

class SkillCrudContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...clearFormFields,
			dragTag: false,
			dragSkill: this.props.dragSkill ? this.props.dragSkill : false,
			tabIndex: TECHTAGS_NDX,
			apiBase: window.apiUrl,
			dispModalMsg: false,
			toast: {},
		};
		this.state.origForm = objCopy(this.state.formFields);
	}

	btns = [
		{
			display: "Yes",
			action: this.clearForm,
		},
		{
			display: "No",
			action: this.closeModalMsg,
		},
	];

	modalMsgBody = "Do you still want to clear the form?";

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.skillInfo !== prevProps.skillInfo) {
			let formFields;
			if (this.props.skillInfo) {
				formFields = this.props.skillInfo;
				this.props.handleChangeMode(this.state.tabIndex + 1);
			} else {
				formFields = clearFormFields.formFields;
				this.props.handleChangeMode(0);
			}

			this.setState({
				formFields: { ...formFields },
				origForm: { ...objCopy(formFields) },
				toast: {},
			});
		}

		if (
			this.props.relatedSkill &&
			(!prevProps.relatedSkill ||
				this.props.relatedSkill.id !== prevProps.relatedSkill.id)
		) {
			switch (this.state.tabIndex) {
				case PSKILLS_NDX:
					this.handleAddRelatedSkill("parentSkills", this.props.relatedSkill);
					break;
				case CSKILLS_NDX:
					this.handleAddRelatedSkill("childSkills", this.props.relatedSkill);
					break;
				default:
				// do nothing
			}
		}

		if (this.props.dragSkill !== prevProps.dragSkill) {
			this.setState({
				dragSkill: this.props.dragSkill,
			});
		}
	}

	handleTabClick = (tabIndex) => {
		if (tabIndex === this.state.tabIndex) return;
		// if a skill name is present, we are in edit mode
		// and need to pass the tab index to the search skills
		// component so it can be context sensitive
		const editMode = this.state.formFields.name === "" ? 0 : tabIndex + 1;
		this.props.handleChangeMode(editMode);
		this.setState({
			tabIndex,
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		this.closeToast();
		let body = {
			...this.state.formFields,
		};
		// need to know if this is a new skill or update
		// (post vs put)
		const id = this.state.formFields.id;
		const httpMethod = id ? "put" : "post";
		const endpoint = id ? `${API_SKILL}/${id}` : API_SKILL;
		const result = await dataFetch(endpoint, "", httpMethod, body);
		// figure out what to do here
		if (result.error) {
			const errMsg =
				result.errorCode === 45001
					? `Skill ${this.state.formFields.name} already exists.`
					: "An unknown error has occurred";
			console.log("Error update Skill: ", result);
			this.addToast(errMsg, "Close", false);
		} else {
			// success.  let user know and clear out form
			const skillName = this.state.formFields.name;
			this.handleClear(false);
			const userMsg = `${skillName} has been ${
				httpMethod === "post" ? "created." : "updated."
			}`;
			this.addToast(userMsg);
		}
	};

	handleInputChange = (value, name) => {
		// const value = target.type === "checkbox" ? target.checked : target.value;

		// check for changing edit mode by a change in the name field
		name === "name" &&
			this.props.handleChangeMode(value === "" ? 0 : this.state.tabIndex + 1);

		let errs = {};
		this.setState({
			formFields: {
				...this.state.formFields,
				[name]: value,
			},
			...errs,
		});
	};

	handleDelRelatedSkill = (skillFieldName, ndx, event) => {
		let treeName, otherTreeName, subFieldName, otherSubFieldName;
		if (skillFieldName === "parentSkills") {
			treeName = "parentTree";
			otherTreeName = "childTree";
			subFieldName = "parents";
			otherSubFieldName = "children";
		} else {
			treeName = "childTree";
			otherTreeName = "parentTree";
			subFieldName = "children";
			otherSubFieldName = "parents";
		}
		let rSkills = objCopy(this.state.formFields[skillFieldName]);
		let rTree = objCopy(this.state.formFields[treeName]);
		const delSkill = rSkills.splice(ndx, 1);
		rTree.splice(
			rTree.findIndex((s) => s.id === delSkill[0].id),
			1
		);
		// treeList cannot be altered by just removing the one skill
		// an entire branch may have just been removed, so it needs to
		// be completely recalculated
		const treeList = getSkillsFromTree(rTree, subFieldName).concat(
			getSkillsFromTree(this.state.formFields[otherTreeName], otherSubFieldName)
		);

		this.setState({
			formFields: {
				...this.state.formFields,
				[skillFieldName]: rSkills,
				[treeName]: rTree,
				treeList,
			},
		});
	};

	handleClear = (checkDirtyFlg = true) => {
		// check for dirty form
		if (checkDirtyFlg && this.checkDirtyForm()) return;
		this.clearForm();
	};

	handleCancel = () => {
		this.btns[0] = {
			display: "Yes",
			action: this.cancelForm,
		};
		this.modalMsgBody = "Do you want to cancel your changes?";
		this.openModalMsg();
	};

	cancelForm = () => {
		this.setState((prev) => {
			return {
				formFields: { ...objCopy(prev.origForm) },
				dispModalMsg: false,
			};
		});
	};

	clearForm = () => {
		this.props.handleChangeMode(0);
		this.setState({
			...clearFormFields,
			errMsg: "",
			userMsg: "",
			dispUserMsg: false,
			dispErrMsg: false,
			origForm: clearFormFields.formFields,
			dispModalMsg: false,
		});
	};

	checkDirtyForm = (openModal = true) => {
		const dirty = deepCompare(this.state.origForm, this.state.formFields)
			? false
			: true;
		if (dirty && openModal) {
			this.btns[0] = {
				display: "Yes",
				action: this.clearForm,
			};
			this.modalMsgBody = "Do you still want to clear the form?";
			this.openModalMsg();
		}
		return dirty;
	};

	closeModalMsg = () => {
		this.setState({
			dispModalMsg: false,
		});
	};

	openModalMsg = () => {
		this.setState({
			dispModalMsg: true,
		});
	};

	addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		this.setState({ toast });
	};

	closeToast = () => {
		this.setState({ toast: {} });
	};

	handleAddTag = (tagInfo) => {
		let techtags = this.state.formFields.techtags;
		techtags.push(tagInfo);

		this.setState({
			formFields: { ...this.state.formFields },
		});
		return true;
	};

	handleAddRelatedSkill = async (skillFieldName, skillInfo) => {
		let treeName, otherTreeName, subFieldName, otherSubFieldName;
		if (skillFieldName === "parentSkills") {
			treeName = "parentTree";
			otherTreeName = "childTree";
			subFieldName = "parents";
			otherSubFieldName = "children";
		} else {
			treeName = "childTree";
			otherTreeName = "parentTree";
			subFieldName = "children";
			otherSubFieldName = "parents";
		}
		// check that a skill is not being related to itself
		if (skillInfo.id === this.state.formFields.id) return;
		// check for duplicate in skill tree
		if (this.state.formFields.treeList.includes(skillInfo.id)) {
			console.log(
				`Skill Id: ${skillInfo.id} is already in the parent or child tree`
			);
			return;
		}

		const newTrees = await this.getAddedSkillTrees(skillInfo.id);
		// false return means error.  Cannot process more and must exit
		if (!newTrees) return;

		// rSkills is the list of either the parent or child skills
		let rSkills = objCopy(this.state.formFields[skillFieldName]);
		rSkills.push(skillInfo);

		// create a treeName property on the new skill
		let rTree = objCopy(this.state.formFields[treeName]);
		const treeSkillInfo = {
			...skillInfo,
			[subFieldName]: newTrees[treeName],
		};
		rTree.push(treeSkillInfo);

		// treeList is the entire tree of related skill id's
		// and needs to be recalculated with the new branch
		const treeList = getSkillsFromTree(rTree, subFieldName).concat(
			getSkillsFromTree(this.state.formFields[otherTreeName], otherSubFieldName)
		);

		this.setState({
			formFields: {
				...this.state.formFields,
				[skillFieldName]: rSkills,
				[treeName]: rTree,
				treeList,
			},
		});
		return true;
	};

	getAddedSkillTrees = async (relatedSkillId) => {
		const endpoint = `${API_RELATED_SKILLS}/${relatedSkillId}`;
		let result = await dataFetch(endpoint);
		if (result.error) {
			this.setState({
				errMsg: "An unknown error has occurred",
			});
			console.log(result);
			return false;
		} else {
			return result[0];
		}
	};

	handleTagStartDrag = (tagInfo) => {
		this.setState({
			dragTag: tagInfo,
		});
	};

	handleDragOver = (event) => {
		event.preventDefault && event.preventDefault();
		return false;
	};

	handleTagDrop = (event) => {
		event.preventDefault && event.preventDefault();
		this.state.dragTag &&
			this.handleAddTag(this.state.dragTag) &&
			this.setState({
				dragTag: false,
			});
	};

	handleSkillDrop = (skillField, event) => {
		event.preventDefault && event.preventDefault();
		this.state.dragSkill &&
			this.handleAddRelatedSkill(skillField, this.state.dragSkill) &&
			this.setState({
				dragSkill: false,
			});
	};

	render() {
		return (
			<React.Fragment>
				<SkillCrudForm
					state={this.state}
					handleTabClick={this.handleTabClick}
					handleSubmit={this.handleSubmit}
					handleInputChange={this.handleInputChange}
					handleDelRelatedSkill={this.handleDelRelatedSkill}
					handleClear={this.handleClear}
					handleCancel={this.handleCancel}
					handleAddTag={this.handleAddTag}
					handleAddRelatedSkill={this.handleAddRelatedSkill}
					handleTagStartDrag={this.handleTagStartDrag}
					handleDragOver={this.handleDragOver}
					handleTagDrop={this.handleTagDrop}
					handleSkillDrop={this.handleSkillDrop}
					checkDirtyForm={this.checkDirtyForm}
					{...this.props}
				/>
				{this.state.dispModalMsg && (
					<div>
						<UserModalMsg
							heading="Warning"
							subHeading="You have unsaved changes"
							msgBody={this.modalMsgBody}
							btns={this.btns}
							closeModalMsg={this.closeModalMsg}
						/>
					</div>
				)}
				{isEmptyObject(this.state.toast) || (
					<Snackbar
						text={this.state.toast.text}
						action={this.state.toast.action}
						autohide={this.state.toast.autoHide}
						timeout={this.state.toast.timeout}
						onDismiss={this.closeToast}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default SkillCrudContainer;
