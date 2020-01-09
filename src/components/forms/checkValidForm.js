// a large routine to check all the fields of a form
// to see if it can be submitted.
// Took out of formInputs.js due to size

import { isEmail, isUrl, isZipcode, convertNameToProperty } from "./formFns";
import { isArray } from "util";

const inpTypes = [
	"InpString",
	"InpTextAsNumber",
	"InpEmail",
	"InpPassword",
	"InpPhone",
	"InpUrl",
	"InpZip",
	"InpTextArea",
	"InpSwitch"
];

export const checkValidInput = (props, inpName) => {
	// let displayName;
	// if (props.name.includes("-")) {
	// 	const tmp = props.name.split("-");
	// 	displayName = tmp[tmp.length - 1];
	// } else {
	// 	displayName = props.name;
	// }
	//displayName = props.label ? props.label : displayName;
	if (props.required && !props.value) {
		return `Required Field`;
	}
	// check if email
	if (inpName === "InpEmail" && !isEmail(props.value)) {
		return `Invalid Email Format`;
	}
	// check if url
	if (inpName === "InpUrl" && !isUrl(props.value)) {
		return `Invalid URL Format`;
	}
	// check if zipcode
	if (inpName === "InpZip" && !isZipcode(props.value)) {
		return `Invalid Zipcode Format`;
	}
	// check if min/max
	if (
		(props.min || props.min === 0) &&
		props.min !== null &&
		!isNaN(props.min) &&
		props.value < props.min
	) {
		return `Min Value = ${props.min}`;
	}
	if (
		(props.max || props.max === 0) &&
		props.max !== null &&
		!isNaN(props.max) &&
		props.value > props.max
	) {
		return `Max Value = ${props.max}`;
	}
	// check minlength/maxlength
	if (
		props.minlength &&
		!isNaN(props.minlength) &&
		props.value.length < props.minlength
	) {
		return `Min characters = ${props.minlength}`;
	}
	if (
		props.maxlength &&
		!isNaN(props.maxlength) &&
		props.value.length > props.maxlength
	) {
		return `Max characters = ${props.maxlength}`;
	}
	// check here for props.maxDate/min
	let testDt;
	if (props.minDate !== null && !isNaN(Date.parse(props.minDate))) {
		testDt = new Date(props.minDate);
		if (props.value < testDt) {
			return `Earliest allowed date is ${props.minDate}`;
		}
	}
	if (props.maxDate !== null && !isNaN(Date.parse(props.maxDate))) {
		testDt = new Date(props.maxDate);
		if (props.value > testDt) {
			return `Latest allowed date is ${props.maxDate}`;
		}
	}
	return "";
};

export const checkValidForm = children => {
	//console.log("checkValidForm children: ", children);
	// check against the validation props for each element
	// and return true if all pass
	let errObj = {};
	const childCount = children.length;
	for (let i = 0; i < childCount; i++) {
		//console.log("i of count: ", i, " of ", childCount);
		let child = children[i];
		if (child === undefined) continue;
		if (!child.props) continue;
		if (child.props && child.props.children) {
			if (!isArray(child.props.children)) continue;
			const tmpObj = checkValidForm(child.props.children);
			errObj = { ...errObj, ...tmpObj };
			continue;
		}
		if (!child.type.name) continue;
		const isInput = inpTypes.includes(child.type.name);
		if (!isInput) continue;
		if (child.props.disabled) continue;
		// we have an Input component.  See if it is
		// required and has an invalid value
		//console.log("validForm child: ", child);
		const propertyName = convertNameToProperty(child.props.name);
		const errMsg = checkValidInput(child.props, child.type.name);
		if (errMsg) errObj[propertyName] = errMsg;
	}

	return errObj;
};

/*
export const getFormInputs = children => {
	let formInputs = [];
	const childCount = children.length;
	for (let i = 0; i < childCount; i++) {
		//console.log("i of count: ", i, " of ", childCount);
		let child = children[i];
		if (child === undefined) continue;
		if (!child.props) continue;
		if (child.props && child.props.children) {
			if (!isArray(child.props.children)) continue;
			formInputs = formInputs.concat(getFormInputs(child.props.children));
			continue;
		}
		if (!child.type.name) continue;
		const isInput = inpTypes.includes(child.type.name);
		if (!isInput) continue;
		// we have an Input component.  Add it to formInputs
		//if (child.props.name === "email1") console.log("email 1 child: ", child);
		formInputs.push(child);
		//validForm = !props.error
	}

	return formInputs;
};
*/
