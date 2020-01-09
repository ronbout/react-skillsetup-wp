import React from "react";
import MuiButton from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import "../button.css";

const Button = ({
	variant = "contained",
	color = "primary",
	tooltip = "",
	btnType = null,
	...rest
}) => {
	const styleBtn = () => {
		if (!btnType) {
			return <MuiButton variant={variant} color={color} {...rest} />;
		}
		return (
			<MuiButton variant={variant} className={`btn btn-${btnType}`} {...rest} />
		);
	};

	if (tooltip) {
		return (
			<Tooltip title={tooltip} placement="top-end">
				<span>{styleBtn()}</span>
			</Tooltip>
		);
	} else {
		return <React.Fragment>{styleBtn()}</React.Fragment>;
	}
};

export default Button;
