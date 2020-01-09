import React from "react";

const ErrorMsg = ({ errMsg }) => {
	const errStyle = {
		margin: "0 0 0 0.5rem",
		fontSize: "0.9em",
		fontWeight: "bold",
		color: "red"
	};
	return (
		<p style={errStyle} className="errorMsg">
			{errMsg}
		</p>
	);
};

export default ErrorMsg;
