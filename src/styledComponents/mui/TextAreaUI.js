import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./textarea.css";

/**
 * material-ui mumbo jumbo
 */

const TextAreaUI = ({
	name,
	value,
	type,
	error,
	errMsg,
	label = "",
	...rest
}) => {
	const useStyles = makeStyles(theme => ({
		textArea: {
			marginTop: theme.spacing(1),
			marginLeft: theme.spacing(2.5),
			marginRight: theme.spacing(2.5),
			padding: theme.spacing(1)
		}
	}));
	const classes = useStyles();
	return (
		<React.Fragment>
			<label className="MuiFormLabel-root tsd-label">{label}</label>
			<TextareaAutosize
				className={classes.textArea}
				name={name}
				value={value}
				type={type}
				{...rest}
			/>
		</React.Fragment>
	);
};

export default TextAreaUI;
