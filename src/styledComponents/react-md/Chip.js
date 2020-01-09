import React from "react";
import { Chip as MdChip } from "react-md";

const Chip = ({ label, removable = false, ...rest }) => {
	return <MdChip label={label} removable={removable} {...rest} />;
};

export default Chip;
