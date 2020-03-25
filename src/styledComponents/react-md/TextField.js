import React from "react";
import { TextField as MdTextField } from "react-md";
import { FontIcon } from "styledComponents/FontIcon";

const TextField = ({
	name,
	value,
	type,
	errMsg,
	label = "",
	maxLength = null,
	reqWarn = false,
	onKeyDown,
	...rest
}) => {
	const style =
		reqWarn && value === ""
			? {
					className: "warning",
					rightIcon: (
						<FontIcon
							style={{ fontSize: "28px", color: "red", marginLeft: "10px" }}
						>
							error_outline
						</FontIcon>
					)
			  }
			: reqWarn
			? {
					rightIcon: (
						<FontIcon
							style={{ fontSize: "28px", color: "green", marginLeft: "10px" }}
						>
							check_circle_outline
						</FontIcon>
					)
			  }
			: {};

	const handleKeyDown = ev => {
		if (maxLength !== null) {
			const val = ev.target.value;
			if (maxLength && !isNaN(maxLength) && val.length >= maxLength) {
				ev.preventDefault();
			}
		}

		onKeyDown && onKeyDown(ev);
	};

	return (
		<MdTextField
			name={name}
			value={value}
			type={type}
			label={label}
			errorText={errMsg}
			floating={true}
			onKeyDown={handleKeyDown}
			maxLength={maxLength}
			{...style}
			{...rest}
		/>
	);
};

export default TextField;
