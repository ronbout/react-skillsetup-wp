import React from "react";
import { SelectionControlGroup } from "react-md";

const RadioUI = ({ id = "radio", name, label = "", ...rest }) => {
	return (
		<SelectionControlGroup
			id={id}
			type="radio"
			label={label}
			name={name}
			{...rest}
		/>
	);
};

export default RadioUI;
