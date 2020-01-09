import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";

const DatePickerUI = ({ name, value, errMsg, label = "", ...rest }) => {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				format="yyyy-MM-dd"
				margin="normal"
				KeyboardButtonProps={{
					"aria-label": "change date"
				}}
				name={name}
				value={value}
				label={label}
				{...rest}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default DatePickerUI;
