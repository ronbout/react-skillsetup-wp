import React from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({
	value,
	label = "",
	className = "",
	monthYearOnly = false,
	...rest
}) => {
	const monthOnly = monthYearOnly
		? {
				dateFormat: "MM/yyyy",
				showMonthYearPicker: true
		  }
		: {};

	return (
		<React.Fragment>
			<div className="tsd-react-datepicker-container">
				<label
					style={{ marginBottom: "16px" }}
					className="md-floating-label--floating md-text--secondary"
				>
					{label}
				</label>
			</div>
			<ReactDatePicker
				selected={value}
				label={label}
				className={className}
				{...monthOnly}
				{...rest}
			/>
		</React.Fragment>
	);
};

export default DatePicker;
