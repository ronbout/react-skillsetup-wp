/* formInputs.js */
import React, { useState, useContext, useEffect } from "react";
import { FormsContext } from "./FormsContext";
import Input from "./Input";
import TextArea from "./TextArea";
import DatePicker from "./DatePicker";
//import PhoneField from "./PhoneField";
import Switch from "./Switch";
import { checkValidForm } from "./checkValidForm";
import { isEmail, isUrl, isZipcode, convertNameToProperty } from "./formFns";
import { getDateStr, createDate } from "assets/js/library.js";
import Radio from "./Radio";
import Select from "./Select";

/**
 *	Form Component
 */
export const Form = ({ children, ...props }) => {
	const { state, dispatch } = useContext(FormsContext);

	const formIsValid = () => {
		const errObj = checkValidForm(children);
		if (Object.keys(errObj).length > 0) {
			dispatch({ type: "setErrObj", payload: errObj });
			return false;
		}
		return true;
	};

	const handleSubmit = ev => {
		ev.preventDefault && ev.preventDefault();
		if (formIsValid()) {
			state.onSubmitFn(ev);
		}
	};

	return (
		<form noValidate autoComplete="off" onSubmit={handleSubmit} {...props}>
			{children}
		</form>
	);
};

/**
 *	InpString Component
 */
export const InpString = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		minlength = null,
		maxLength = null,
		required = false,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const performErrCheck = val => {
		// check here for maxLimit/min
		if (minlength !== null && !isNaN(minlength) && val.length < minlength) {
			setErrMsg(`Must contain ${minlength} characters`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		// if the value is a numeric, convert to number
		// otherwise, the comparison against original value
		// will fail string vs. number
		const value = ev.target.value;
		const val =
			value === "" ||
			value.charAt(value.length - 1) === " " ||
			isNaN(Number(value))
				? value
				: Number(value);
		if (errMsg) performErrCheck(ev.target.value);
		// have to convert back to event
		const event = { ...ev };
		event.target.value = val;
		state.onChangeFn(ev);
	};

	const handleInput = ev => {
		// check for maxLength so that it does not go over
		const inpValue = ev.target.value;
		if (maxLength && inpValue.length > maxLength) {
			ev.target.value = ev.target.value.substring(0, maxLength);
			setErrMsg(`Max characters: ${maxLength}`);
		}
	};

	return (
		<Input
			type="text"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			onBlur={onBlur}
			onInput={handleInput}
			maxLength={maxLength}
			performErrCheck={performErrCheck}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpTextAsNumber Component
 */
export const InpTextAsNumber = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		min = null,
		max = null,
		maxLength,
		required = false,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const performErrCheck = val => {
		// check here for maxLimit/min
		if (min !== null && !isNaN(min) && val < min) {
			setErrMsg(`Minimum value is : ${min}`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
		if (max !== null && !isNaN(max) && val > max) {
			setErrMsg(`Maximum value is : ${max}`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		performErrCheck(ev.target.value);
		state.onChangeFn(ev);
	};

	const handleInput = ev => {
		const inpValue = ev.target.value;
		if (isNaN(inpValue)) {
			ev.target.value = value;
		}
	};

	return (
		<Input
			type="text"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			onInput={handleInput}
			maxLength={maxLength}
			performErrCheck={performErrCheck}
			onBlur={onBlur}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpNumber Component
 */
export const InpNumber = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		min = null,
		max = null,
		required = false,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const performErrCheck = val => {
		// check here for maxLimit/min
		if (min !== null && !isNaN(min) && val < min) {
			setErrMsg(`Minimum value is : ${min}`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
		if (max !== null && !isNaN(max) && val > max) {
			setErrMsg(`Maximum value is : ${max}`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		performErrCheck(ev.target.value);
		state.onChangeFn(ev);
	};

	return (
		<Input
			type="number"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			performErrCheck={performErrCheck}
			onBlur={onBlur}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpEmail Component
 */
export const InpEmail = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		required = false,
		maxLength,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const invalidEmailMsg = "Invalid Email format";

	const performErrCheck = val => {
		// check here for valid email
		if (!isEmail(val)) {
			setErrMsg(invalidEmailMsg);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		if (errMsg === invalidEmailMsg) performErrCheck(ev.target.value);
		state.onChangeFn(ev);
	};

	return (
		<Input
			type="email"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			performErrCheck={performErrCheck}
			maxLength={maxLength}
			onBlur={onBlur}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpUrl Component
 */
export const InpUrl = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		required = false,
		maxLength,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const performErrCheck = val => {
		// check here for valid email
		if (!isUrl(val)) {
			setErrMsg(`Invalid URL format`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		if (errMsg) performErrCheck(ev.target.value);
		state.onChangeFn(ev);
	};

	return (
		<Input
			type="url"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			performErrCheck={performErrCheck}
			maxLength={maxLength}
			onBlur={onBlur}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpPassword Component
 */
export const InpPassword = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		minlength = null,
		maxLength = null,
		required = false,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const performErrCheck = val => {
		// check here for maxLimit/min
		if (minlength !== null && !isNaN(minlength) && val.length < minlength) {
			setErrMsg(`Must contain ${minlength} characters`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		if (errMsg) performErrCheck(ev.target.value);
		state.onChangeFn(ev);
	};

	return (
		<Input
			type="password"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			performErrCheck={performErrCheck}
			maxLength={maxLength}
			onBlur={onBlur}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpDate Component
 */
export const InpDate = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		onBlur = null,
		minDate,
		maxDate,
		value,
		required = false,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);
	const [dateVal, setDateVal] = useState(
		Date.parse(value) ? createDate(value) : null
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	useEffect(() => {
		setDateVal(Date.parse(value) ? createDate(value) : null);
	}, [value]);

	const minAdjDate = minDate ? createDate(minDate) : null;
	const maxAdjDate = maxDate ? createDate(maxDate) : null;

	const minMaxDate = {};
	if (minAdjDate) minMaxDate.minDate = minAdjDate;
	if (maxAdjDate) minMaxDate.maxDate = maxAdjDate;

	const performErrCheck = val => {
		return;
		// const minDate = props.minDate ? props.minDate : null;
		// const maxDate = props.maxDate ? props.maxDate : null;
		// let testDt;
		// // check here for maxDate/min
		// if (minDate !== null && !isNaN(Date.parse(minDate))) {
		// 	testDt = createDate(minDate);
		// 	if (val < testDt) {
		// 		setErrMsg(`Earliest date is ${minDate}`);
		// 		return;
		// 	}
		// 	if (errMsg) {
		// 		setErrMsg("");
		// 	}
		// } else {
		// 	if (errMsg) {
		// 		setErrMsg("");
		// 	}
		// }
		// if (maxDate !== null && !isNaN(Date.parse(maxDate))) {
		// 	testDt = createDate(maxDate);
		// 	if (val > testDt) {
		// 		setErrMsg(`Latest date is ${maxDate}`);
		// 		return;
		// 	}
		// 	if (errMsg) {
		// 		setErrMsg("");
		// 	}
		// } else {
		// 	if (errMsg) {
		// 		setErrMsg("");
		// 	}
		// }
	};

	const handleChange = date => {
		// console.log("date handlechange typeof inpDate: ", typeof inpDate);
		// console.log("date handlechange inpDate: ", inpDate);
		// const tmp = inpDate.split("/");
		// const tmpDate = `${tmp[2]}-${tmp[0].padStart(2, "0")}-${tmp[1].padStart(
		// 	2,
		// 	"0"
		// )}`;
		// const date = createDate(tmpDate);
		// setDateVal(date);
		setDateVal(date);
		if (errMsg) performErrCheck(date);
		// unlike EVERY other onChange behavior, this does not
		// return an event object, so must mimic one
		const event = { target: {} };
		event.target.value = getDateStr(date);
		event.target.name = name;
		state.onChangeFn(event);
	};

	return (
		<DatePicker
			name={name}
			value={dateVal}
			onChange={handleChange}
			required={required}
			performErrCheck={performErrCheck}
			onBlur={onBlur}
			errMsg={errMsg}
			{...minMaxDate}
			{...rest}
		/>
	);
};

/**
 *	InpPhone Component
 */
export const InpPhone = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		minlength = null,
		maxLength = null,
		required = false,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const performErrCheck = val => {
		// check here for maxLimit/min
		if (minlength !== null && !isNaN(minlength) && val.length < minlength) {
			setErrMsg(`Must contain ${minlength} characters`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		if (errMsg) performErrCheck(ev.target.value);
		state.onChangeFn(ev);
	};

	const handleInput = ev => {
		// check for maxLength so that it does not go over
		const inpValue = ev.target.value;
		if (maxLength && inpValue.length > maxLength) {
			ev.target.value = ev.target.value.substring(0, maxLength);
			setErrMsg(`Max characters: ${maxLength}`);
		}
	};

	return (
		<Input
			type="tel"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			onBlur={onBlur}
			maxLength={maxLength}
			onInput={handleInput}
			performErrCheck={performErrCheck}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpZip Component
 */
export const InpZip = props => {
	const { state } = useContext(FormsContext);
	const { name, value, onBlur = null, required = false, ...rest } = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const maxLength = 12;

	const performErrCheck = val => {
		// check here for valid email
		if (!isZipcode(val)) {
			setErrMsg(`Invalid Zipcode format`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};

	const handleChange = ev => {
		if (errMsg) performErrCheck(ev.target.value);
		state.onChangeFn(ev);
	};

	const handleInput = ev => {
		// check for maxLength so that it does not go over
		const inpValue = ev.target.value;
		if (maxLength && inpValue.length > maxLength) {
			ev.target.value = ev.target.value.substring(0, maxLength);
			setErrMsg(`Max characters: ${maxLength}`);
		}
	};

	return (
		<Input
			type="text"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			maxLength={maxLength}
			performErrCheck={performErrCheck}
			onInput={handleInput}
			onBlur={onBlur}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpTextArea Component
 */
export const InpTextArea = props => {
	const { state } = useContext(FormsContext);
	const {
		name,
		value,
		onBlur = null,
		minlength = null,
		maxLength = null,
		required = false,
		...rest
	} = props;
	const propertyName = convertNameToProperty(name);
	const [errMsg, setErrMsg] = useState(
		state.errMsg[propertyName] ? state.errMsg[propertyName] : ""
	);

	useEffect(() => {
		state.errMsg[propertyName] && setErrMsg(state.errMsg[propertyName]);
	}, [state.errMsg, propertyName]);

	useEffect(() => {
		if (state.resetErrMsg && errMsg) {
			setErrMsg("");
		}
	}, [state.resetErrMsg, errMsg]);

	const performErrCheck = val => {
		// check here for maxLimit/min
		if (minlength !== null && !isNaN(minlength) && val.length < minlength) {
			setErrMsg(`Must contain ${minlength} characters`);
			return;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
		}
	};
	const handleChange = val => {
		//checkRequired(ev.target.value);
		// react-md only returns the value
		// must mimic event to stay consistent
		const event = { target: {} };
		event.target.value = val;
		event.target.name = props.name;
		if (errMsg) performErrCheck(val);
		state.onChangeFn(event);
	};

	const handleInput = ev => {
		// check for maxLength so that it does not go over
		const inpValue = ev.target.value;
		if (maxLength && inpValue.length > maxLength) {
			ev.target.value = ev.target.value.substring(0, maxLength);
			setErrMsg(`Max characters: ${maxLength}`);
		}
	};

	return (
		<TextArea
			type="text"
			name={name}
			value={value}
			onChange={handleChange}
			required={required}
			onBlur={onBlur}
			onInput={handleInput}
			maxLength={maxLength}
			performErrCheck={performErrCheck}
			errMsg={errMsg}
			{...rest}
		/>
	);
};

/**
 *	InpSwitch Component
 */
export const InpSwitch = props => {
	const { state } = useContext(FormsContext);

	const { name, checked, onBlur = null, ...rest } = props;

	const handleChange = ev => {
		console.log("switch handleChange: ", ev);
		const event = { target: { type: "checkbox" } };
		event.target.name = name;
		event.target.checked = ev;
		state.onChangeFn(event);
	};

	return (
		<Switch
			type="switch"
			name={name}
			checked={checked}
			onChange={handleChange}
			onBlur={onBlur}
			{...rest}
		/>
	);
};

/**
 *	InpRadio Component
 */
export const InpRadio = props => {
	const { state } = useContext(FormsContext);

	// controls must be an array of objects {label: 'Apple', value: 'A1' }
	const { name, value, controls = [], onBlur = null, ...rest } = props;

	const handleChange = checked => {
		const event = { target: { type: "radio" } };
		event.target.name = name;
		event.target.checked = checked;
		state.onChangeFn(event);
	};

	return (
		<Radio
			name={name}
			controls={controls}
			onChange={handleChange}
			onBlur={onBlur}
			{...rest}
		/>
	);
};

/**
 *	InpSelect Component
 */
export const InpSelect = props => {
	const { state } = useContext(FormsContext);

	// menuItems must be an array of objects {label: 'Apple', value: 'A1' }
	const { name, value, menuItems = [], onBlur = null, ...rest } = props;

	const handleChange = val => {
		console.log("select handleChange: ", val);
		const event = { target: { type: "select" } };
		event.target.name = name;
		event.target.checked = val;
		state.onChangeFn(event);
	};

	return (
		<Select
			name={name}
			menuItems={menuItems}
			onChange={handleChange}
			onBlur={onBlur}
			value={value}
			{...rest}
		/>
	);
};
