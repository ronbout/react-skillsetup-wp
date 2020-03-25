import React from "react";
import { TextField as MdTextField } from "react-md";
import { FontIcon } from "styledComponents/FontIcon";

const TextAreaUI = ({
	name,
	value,
	type,
	rows = 1,
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
							style={{
								fontSize: "28px",
								color: "red",
								paddingLeft: 28,
								marginBottom: -24
							}}
						>
							error_outline
						</FontIcon>
					)
			  }
			: reqWarn
			? {
					rightIcon: (
						<FontIcon
							style={{
								fontSize: "28px",
								color: "green",
								paddingLeft: 28,
								marginBottom: -24
							}}
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
			rows={rows}
			errorText={errMsg}
			floating={true}
			onKeyDown={handleKeyDown}
			maxLength={maxLength}
			{...style}
			{...rest}
		/>
	);
};

export default TextAreaUI;
