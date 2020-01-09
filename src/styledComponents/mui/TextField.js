import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";

/**
 * material-ui mumbo jumbo
 */

const TextField = ({ name, value, type, errMsg, label = "", ...rest }) => {
	const useStyles = makeStyles(theme => ({
		textField: {
			marginTop: theme.spacing(1),
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200
		}
	}));
	const classes = useStyles();
	return (
		<MuiTextField
			className={classes.textField}
			name={name}
			value={value}
			type={type}
			label={label}
			{...rest}
		/>
	);
};

export default TextField;
