import React, { useState } from "react";
import Chip from "styledComponents/Chip";
import SkillSearchContainer from "../../search/SkillSearch/";
import MakePopup from "../../hoc/MakePopup";
import dataFetch from "../../../assets/js/dataFetch";

import "./css/skillList.css";

const SkillSearchPopup = MakePopup(
	SkillSearchContainer,
	{
		right: "60px",
		top: "152px",
		width: "344px",
		borderRadius: "20px"
	},
	true
);

const SkillList = ({
	skills,
	candId,
	handleSkillsChange,
	editFlag,
	dispSearch = true
}) => {
	const [dispSkillSearchFlag, setDispSkillSearchFlag] = useState(dispSearch);
	const [skillDrag, setSkillDrag] = useState(false);

	const handleOpenSkillSearch = () => {
		setDispSkillSearchFlag(true);
	};

	const handleAddSkill = async skillInfo => {
		// check for duplicate
		if (
			skills.some(skill => {
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
		const csId = await getCandidateSkillId(candId, skillInfo.id);
		skillInfo.candidateSkillId = csId;
		let tmpSkills = skills.slice();
		tmpSkills.push(skillInfo);
		handleSkillsChange(tmpSkills);
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
		let tmpSkills = skills.slice();
		tmpSkills.splice(ndx, 1);
		handleSkillsChange(tmpSkills);
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
			{/*editFlag ? <p>Edit Skills</p> : <p>Skills</p>*/}

			<div className="skills-list">
				{skills &&
					skills.map((skill, ndx) => {
						return (
							<Chip
								id={skill.id}
								key={skill.id}
								label={skill.name}
								removable={editFlag}
								onClick={() => handleDelSkill(ndx)}
							/>
						);
					})}
				{editFlag && !dispSkillSearchFlag && (
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
