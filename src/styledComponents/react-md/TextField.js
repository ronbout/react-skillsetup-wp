import React from "react";
import { TextField as MdTextField } from "react-md";
import { FontIcon } from "styledComponents/FontIcon";

const TextField = ({
	name,
	value,
	type,
	errMsg,
	label = "",
	reqWarn = false,
	...rest
}) => {
	// const style =
	// 	reqWarn && value === ""
	// 		? {
	// 				inputStyle: { border: "2px solid red", padding: "8px" },
	// 				className: "warning"
	// 		  }
	// 		: {};
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
	return (
		<MdTextField
			name={name}
			value={value}
			type={type}
			label={label}
			errorText={errMsg}
			{...style}
			{...rest}
		/>
	);
};

export default TextField;
