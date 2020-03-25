import React from "react";
import TextField from "styledComponents/TextField";

const SkillDescSection = props => {
	return (
		<div className="tsd-form-section">
			<h2>Skill View/Entry</h2>
			<div className="tsd-form-row">
				<TextField
					type="text"
					label="Skill Name *"
					name="name"
					id="name"
					maxLength={80}
					value={props.formFields.name}
					onChange={val => props.handleInputChange(val, "name")}
					autoFocus
					required
				/>
			</div>
			<div className="tsd-form-row">
				<TextField
					type="text"
					label="Description"
					name="description"
					id="description"
					maxLength={240}
					value={props.formFields.description}
					onChange={val => props.handleInputChange(val, "description")}
				/>
			</div>
			<div className="tsd-form-row">
				<TextField
					type="url"
					label="URL"
					name="url"
					id="url"
					maxLength={120}
					value={props.formFields.url}
					onChange={val => props.handleInputChange(val, "url")}
				/>
			</div>
		</div>
	);
};

export default SkillDescSection;
