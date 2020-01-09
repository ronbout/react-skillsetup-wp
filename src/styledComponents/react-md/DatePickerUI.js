import React from "react";
import { DatePicker } from "react-md";

const DatePickerUI = ({
	name,
	value,
	errMsg,
	label = "",
	className = "",
	...rest
}) => {
	const classnames = `md-cell ${className}`;

	return (
		<DatePicker
			name={name}
			defaultValue={value}
			label={label}
			className={classnames}
			errorText={errMsg}
			{...rest}
		/>
	);
};

export default DatePickerUI;
