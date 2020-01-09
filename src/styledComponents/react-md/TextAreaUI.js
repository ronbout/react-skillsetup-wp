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
	reqWarn = false,
	...rest
}) => {
	const style =
		reqWarn && value === ""
			? {
					// inputStyle: {
					// 	border: "2px solid red",
					// 	height: "48px !important"
					// },
					className: "warning",
					rightIcon: (
						<FontIcon
							style={{ fontSize: "28px", color: "red", paddingLeft: "20px" }}
						>
							error_outline
						</FontIcon>
					)
			  }
			: reqWarn
			? {
					rightIcon: (
						<FontIcon
							style={{ fontSize: "28px", color: "green", paddingLeft: "28px" }}
						>
							check_circle_outline
						</FontIcon>
					)
			  }
			: {};
	return (
		<MdTextField
			name={name}
			value={value}
			type={type}
			label={label}
			rows={rows}
			errorText={errMsg}
			{...style}
			{...rest}
		/>
	);
};

export default TextAreaUI;
