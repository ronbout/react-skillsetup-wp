import React from "react";
import { Button as MdButton } from "react-md";

import "../button.css";

const Button = ({
	variant = "raised",
	color = "primary",
	tooltip = "",
	btnType = null,
	...rest
}) => {
	const btnAttrs = {};
	btnAttrs[variant] = true;
	color && (btnAttrs[color] = true);
	tooltip && (btnAttrs.tooltipLabel = tooltip);

	const styleBtn = () => {
		if (!btnType) {
			return <MdButton {...btnAttrs} {...rest} />;
		}
		return (
			<MdButton {...btnAttrs} className={`btn btn-${btnType}`} {...rest} />
		);
	};

	return <React.Fragment>{styleBtn()}</React.Fragment>;
};

export default Button;
