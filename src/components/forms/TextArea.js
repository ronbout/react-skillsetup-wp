import React, { useState, useEffect } from "react";
import TextAreaBase from "styledComponents/TextAreaBase";
// import { checkValidInput } from "./checkValidForm";
// import ErrorMsg from "./ErrorMsg";

const Input = props => {
	const [errFlg, setErrFlg] = useState(false);
	const [errMsg, setErrMsg] = useState(props.errMsg);
	const {
		id,
		inpType,
		performErrCheck,
		onBlur,
		required,
		maxLength,
		rows = 1,
		...rest
	} = props;

	useEffect(() => {
		setErrMsg(props.errMsg);
	}, [props.errMsg]);

	// useEffect(() => {
	// 	const valid = checkValidInput(props, inpType);
	// 	console.log("textarea valid: ", valid);
	// 	setErrFlg(!valid);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [props]);

	useEffect(() => {
		setErrFlg(errMsg === true);
	}, [errMsg]);

	const checkRequired = val => {
		if (required && val.length === 0) {
			setErrMsg("This field is required");
			return true;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
			return false;
		}
	};

	const handleOnBlur = ev => {
		const inputVal = ev.target.value;
		const reqFlg = checkRequired(inputVal);
		!reqFlg && performErrCheck && performErrCheck(ev.target.value);
		onBlur && onBlur(ev);
	};

	const handleKeyDown = ev => {
		// const key = ev.key;
		// if (key === "Enter") {
		// 	ev.preventDefault();
		// }
	};

	return (
		<div className="input-div">
			<div className="textarea MuiFormControl-root MuiTextField-root">
				<TextAreaBase
					id={id}
					error={errFlg}
					errMsg={errMsg}
					onBlur={handleOnBlur}
					onKeyDown={handleKeyDown}
					rows={rows}
					onKeyPress={handleKeyDown}
					maxLength={maxLength}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default Input;
