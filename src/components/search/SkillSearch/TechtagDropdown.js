import React, { useState } from "react";
import SelectField from "styledComponents/SelectField";

const TechtagDropdown = ({
	tagOptions = [],
	openTagOptions,
	tagSelect,
	handleTagSelect
}) => {
	const [selectValue, setSelectValue] = useState(tagSelect);

	let selectOptions = [{ label: "none", value: -1 }];

	selectOptions = selectOptions.concat(
		tagOptions.map((tag, ndx) => {
			return { label: tag.name, value: ndx };
		})
	);

	const handleChange = value => {
		setSelectValue(value);
		handleTagSelect(value);
	};

	const displayTechtagSelect = () => {
		return (
			<SelectField
				id="select-techtag"
				label="Filter By Techtag"
				placeholder="Techtag"
				menuItems={selectOptions}
				simplifiedMenu={true}
				value={selectValue}
				onChange={handleChange}
				style={{ width: "100%" }}
			/>
		);
	};

	return displayTechtagSelect();
};

export default TechtagDropdown;
