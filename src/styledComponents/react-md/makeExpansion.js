import React from "react";
import { ExpansionPanel } from "react-md";

const makeExpansion = (
	ExpandComponent,
	heading,
	footer = null,
	defaultExpanded = false,
	zDepth = 1,
	onToggle = null
) => {
	const label = heading();
	// console.log("make expansion label: ", label);
	return props => {
		return (
			<ExpansionPanel
				label={label}
				footer={footer}
				style={{ background: "inherit", width: "100%" }}
				zDepth={zDepth}
				defaultExpanded={defaultExpanded}
				onExpandToggle={onToggle}
			>
				<ExpandComponent {...props} />
			</ExpansionPanel>
		);
	};
};

export default makeExpansion;
