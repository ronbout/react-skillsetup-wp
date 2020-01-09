import React from "react";
import TextField from "./TextField";
import Button from "./Button";

const SearchBar = ({
	id,
	label = "",
	placeholder = "",
	onSearch,
	textProps,
	buttonProps
}) => {
	const labelObj = label ? { label } : {};
	const placeObj = placeholder ? { placeholder } : {};
	return (
		<div style={{ width: "100%" }}>
			<TextField
				id={`tf-${id}`}
				style={{ display: "inline-block", paddingRight: "40px" }}
				{...labelObj}
				{...placeObj}
				{...textProps}
			/>
			<Button
				id={`btn-${id}`}
				variant="icon"
				style={{ marginLeft: "-40px" }}
				onClick={onSearch}
				{...buttonProps}
			>
				search
			</Button>
		</div>
	);
};

export default SearchBar;
