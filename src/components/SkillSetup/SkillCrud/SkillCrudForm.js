import React from "react";
import TechtagSelectContainer from "components/TechtagSelect/";
import SkillDescSection from "./SkillDescSection";
import RelatedItemsList from "./RelatedItemsList";
import SkillTreeContainer from "./SkillTreeContainer";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	TabbedUI,
	TabList,
	Tab,
	TabPanels,
	TabPanel
} from "components/TabbedUI/TabbedUI";
import Button from "styledComponents/Button";

const SkillCrudForm = props => {
	const tagsAndRelatedSkillsSection = () => {
		return (
			<div className="tabbed-section">
				<TabbedUI>
					<TabList callBk={tabPanelsCallBk}>
						<Tab>Techtags</Tab>
						<Tab>Parent Skills</Tab>
						<Tab>Child Skills</Tab>
						<Tab>Skill Trees</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>{techTagSection()}</TabPanel>
						<TabPanel>{parentSkillSection()}</TabPanel>
						<TabPanel>{childSkillSection()}</TabPanel>
						<TabPanel>{skillTreeSection()}</TabPanel>
					</TabPanels>
				</TabbedUI>
			</div>
		);
	};

	const tabPanelsCallBk = activeNdx => {
		props.handleTabClick(activeNdx);
	};

	const parentChildSkillsSection = (skillFieldName, dispName) => {
		return (
			<section className="skill-related-section">
				<div
					className="related-list"
					onDragOver={props.handleDragOver}
					onDrop={event => props.handleSkillDrop(skillFieldName, event)}
				>
					<RelatedItemsList
						heading={dispName}
						items={props.state.formFields[skillFieldName]}
						skillFieldName={skillFieldName}
						handleDelItem={props.handleDelRelatedSkill}
					/>
					{props.state.formFields.name !== "" && (
						<p>Drag and Drop from Skill Search List</p>
					)}
				</div>
			</section>
		);
	};

	const parentSkillSection = () => {
		return parentChildSkillsSection("parentSkills", "Parent Skills");
	};

	const childSkillSection = () => {
		return parentChildSkillsSection("childSkills", "Child Skills");
	};

	const skillTreeSection = () => {
		return (
			<SkillTreeContainer
				parentTree={props.state.formFields.parentTree}
				childTree={props.state.formFields.childTree}
			/>
		);
	};

	const techTagSection = () => {
		return (
			<section className="skill-related-section">
				<div
					className="related-list"
					onDragOver={props.handleDragOver}
					onDrop={props.handleTagDrop}
				>
					<RelatedItemsList
						heading="Techtag"
						items={props.state.formFields.techtags}
						skillFieldName="techtags"
						handleDelItem={props.handleDelRelatedSkill}
					/>
					{props.state.formFields.name !== "" && (
						<p>Drag and Drop from Tag List</p>
					)}
				</div>
				{props.state.formFields.name && (
					<TechtagSelectContainer
						skillTagsList={props.state.formFields.techtags}
						handleAddTag={props.handleAddTag}
						handleTagStartDrag={props.handleTagStartDrag}
					/>
				)}
			</section>
		);
	};

	const buttonSection = () => {
		return (
			<div className="fs-btn-container" style={{ textAlign: "center" }}>
				<Button type="submit" disabled={props.state.formFields.name === ""}>
					{props.state.formFields.id === "" ? "Add skill" : "Update skill"}
				</Button>
				<Button
					btnType="warning"
					style={{ marginLeft: "26px" }}
					onClick={props.handleClear}
				>
					Clear Skill
				</Button>
				<Button
					btnType="secondary"
					style={{ marginLeft: "26px" }}
					onClick={props.handleCancel}
					disabled={!props.checkDirtyForm(false)}
				>
					Cancel
				</Button>
			</div>
		);
	};

	return (
		<form className="basic-skill-form" onSubmit={props.handleSubmit}>
			<input type="hidden" name="id" value={props.state.formFields.id} />
			<div className="basic-skill-container">
				<SkillDescSection
					formFields={props.state.formFields}
					handleInputChange={props.handleInputChange}
				/>
				{tagsAndRelatedSkillsSection()}
				{buttonSection()}
			</div>
		</form>
	);
};

export default SkillCrudForm;
