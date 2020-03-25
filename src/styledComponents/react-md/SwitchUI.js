import React from "react";
import { Switch as MdSwitch } from "react-md";

const SwitchUI = ({
	id = "switch",
	name,
	checked,
	labelPlacement = "end",
	label = "",
	...rest
}) => {
	return (
		<MdSwitch
			id={id}
			type="switch"
			label={label}
			name={name}
			checked={checked}
			labelBefore={labelPlacement !== "end"}
			{...rest}
		/>
	);
};

export default SwitchUI;
