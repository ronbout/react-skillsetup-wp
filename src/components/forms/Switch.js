import React from "react";
import SwitchBase from "styledComponents/SwitchBase";

const Switch = props => {
	const { inpType, name, checked = false, onBlur, ...rest } = props;

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
		<div>
			<SwitchBase
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				checked={checked}
				name={name}
				{...rest}
			/>
		</div>
	);
};

export default Switch;
