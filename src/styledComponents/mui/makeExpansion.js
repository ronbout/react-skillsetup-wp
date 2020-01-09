import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const makeExpansion = (ExpandComponent, Heading) => {
	return props => {
		return (
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Heading />
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<ExpandComponent {...props} />
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	};
};

export default makeExpansion;
