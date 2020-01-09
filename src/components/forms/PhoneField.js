import React, { useState, useEffect } from "react";
import PhoneFieldBase from "styledComponents/PhoneFieldBase";
import { checkValidInput } from "./checkValidForm";
import ErrorMsg from "./ErrorMsg";

const PhoneField = props => {
	const [errFlg, setErrFlg] = useState(false);
	const [errMsg, setErrMsg] = useState(props.errMsg);
	const { inpType, performErrCheck, onBlur, required, ...rest } = props;

	useEffect(() => {
		setErrMsg(props.errMsg);
	}, [props.errMsg]);

	useEffect(() => {
		const valid = checkValidInput(props, inpType);
		setErrFlg(!valid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

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
		const key = ev.key;
		if (key === "Enter") {
			ev.preventDefault();
		}
	};

	return (
		<div>
			<PhoneFieldBase
				error={errFlg}
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				{...rest}
			/>
			{errMsg ? <ErrorMsg errMsg={errMsg} /> : <p></p>}
		</div>
	);
};

export default PhoneField;
