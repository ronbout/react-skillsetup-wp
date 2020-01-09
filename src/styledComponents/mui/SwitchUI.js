import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const SwitchUI = ({
	name,
	checked,
	labelPlacement = "end",
	label = "",
	...rest
}) => {
	return (
		<FormControlLabel
			control={
				<Switch checked={checked} value="checkedA" color="primary" {...rest} />
			}
			label={label}
			labelPlacement={labelPlacement}
		/>
	);
};

export default SwitchUI;
