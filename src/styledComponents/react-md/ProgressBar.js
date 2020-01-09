import React from "react";
import { LinearProgress } from "react-md";

const ProgressBar = ({ value, height = 25, ...rest }) => {
	return (
		<section>
			<LinearProgress value={value} style={{ height }} {...rest} />
		</section>
	);
};

export default ProgressBar;
