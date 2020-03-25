/* Select.js */
import React from "react";
import SelectField from "styledComponents/SelectField";

const Radio = props => {
	const { name, onBlur, simplifiedMenu = true, ...rest } = props;

	const handleOnBlur = ev => {
		onBlur && onBlur(ev);
	};

	const handleKeyDown = ev => {
		const key = ev.key;
		if (key === "Enter") {
			ev.preventDefault();
		}
	};

	return (
		<div className="input-div">
			<SelectField
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				name={name}
				simplifiedMenu={simplifiedMenu}
				{...rest}
			/>
		</div>
	);
};

export default Radio;
