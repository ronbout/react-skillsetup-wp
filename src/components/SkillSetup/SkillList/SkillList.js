import React, { useState } from "react";
import Chip from "styledComponents/Chip";
import SkillSearchContainer from "components/search/SkillSearch/";
import MakePopup from "components/hoc/MakePopup";
import dataFetch from "assets/js/dataFetch";

import "./css/skillList.css";

const SkillSearchPopup = MakePopup(
	SkillSearchContainer,
	{
		right: "100px",
		top: "100px",
		width: "344px"
	},
	true
);

const SkillList = props => {
	const [dispSkillSearchFlag, setDispSkillSearchFlag] = useState(false);
	const [skillDrag, setSkillDrag] = useState(false);

	const handleOpenSkillSearch = () => {
		setDispSkillSearchFlag(true);
	};

	const handleAddSkill = async skillInfo => {
		// check for duplicate
		if (
			props.skills.some(skill => {
				return skill.id === skillInfo.id;
			})
		)
			return;
		/**
		 *
		 *
		 *  run api call to see if this skill is already
		 *  part of the candidate's list.  if so, attach
		 *  the candidate_skills id.  otherwise, just leave
		 *  as an empty string.
		 *
		 *
		 */
		const csId = await getCandidateSkillId(props.candId, skillInfo.id);
		skillInfo.candidateSkillId = csId;
		let tmpSkills = props.skills.slice();
		tmpSkills.push(skillInfo);
		props.handleSkillsChange(tmpSkills);
	};

	const getCandidateSkillId = async (candId, skillId) => {
		const csApiUrl = `/candidate_skills/skill_candidate_id/${skillId}`;
		const queryStr = `&candidateId=${candId}`;
		let csId = "";
		let result = await dataFetch(csApiUrl, queryStr);
		if (!result.error) {
			csId = result.id;
		}
		return csId;
	};

	const handleDelSkill = ndx => {
		let tmpSkills = props.skills.slice();
		tmpSkills.splice(ndx, 1);
		props.handleSkillsChange(tmpSkills);
	};

	const handleCloseSkillSearch = () => {
		setDispSkillSearchFlag(false);
	};

	const handleSkillStartDrag = skillInfo => {
		setSkillDrag(skillInfo);
	};

	const handleSkillDrop = event => {
		event.preventDefault && event.preventDefault();
		skillDrag && handleAddSkill(skillDrag);
	};

	const handleDragOver = event => {
		event.preventDefault && event.preventDefault();
		return false;
	};

	const handleDragEnd = event => {
		if (skillDrag) {
			// we are either dragging the entire skill search component
			// or just a single skill to add.  This will fire after the
			// onDrop, so if it was a skill, turn skill drag off and return
			setSkillDrag(false);
			return;
		}
	};

	return (
		<div
			className="skills-container"
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDrop={handleSkillDrop}
		>
			{/*props.editFlag ? <p>Edit Skills</p> : <p>Skills</p>*/}

			<div className="skills-list">
				{props.skills &&
					props.skills.map((skill, ndx) => {
						return (
							<Chip
								id={skill.id}
								key={skill.id}
								label={skill.name}
								removable={props.editFlag}
								onClick={() => handleDelSkill(ndx)}
							/>
						);
					})}
				{props.editFlag && !dispSkillSearchFlag && (
					<React.Fragment>
						<Chip
							id="btn-add-skill"
							label="Add Skill"
							className="chip-btn"
							onClick={handleOpenSkillSearch}
						/>
					</React.Fragment>
				)}
			</div>
			{dispSkillSearchFlag && dispSkillSearch()}
		</div>
	);

	function dispSkillSearch() {
		return (
			<SkillSearchPopup
				editMode="1"
				searchButton="Add Skill"
				forceRefresh={false}
				handleSkillSelect={handleAddSkill}
				handleSkillStartDrag={handleSkillStartDrag}
				closeBtn={handleCloseSkillSearch}
			/>
		);
	}
};

export default SkillList;
