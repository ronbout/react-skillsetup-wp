/**
 * library.js
 * useful js functions
 * ex.  email validation routine
 *
 */

/**
 * This function is used to add CR/LF to a title
 * attribue for an easy hover tooltip
 * 'title' does not accept html, so this is one
 * way around that
 * most common use case: convertHtmlToText("&#013;&#010;")
 */
export const convertHtmlToText = value => {
	let d = document.createElement("div");
	d.innerHTML = value;
	d.id = "tmp-div";
	let retVal = d.innerText;
	document.body.appendChild(d);
	let tmp = document.getElementById("tmp-div");
	tmp.parentNode.removeChild(tmp);
	return retVal;
};

export function isEmail(email) {
	// returns true or false if email is correctly formatted

	// test length
	if (email.length < 6) return false;

	// test for @ character
	if (email.indexOf("@") < 1) return false;

	// split at the @, making sure it is only 2
	// then test each part
	let emailArray = email.split("@");
	if (emailArray.length !== 2) return false;
	let local = emailArray[0];
	let domain = emailArray[1];

	// test for invalid characters
	let regex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
	if (!local.match(regex)) return false;

	// test for periods in a row in domain
	regex = /\.{2,}/;
	if (domain.match(regex)) return false;

	// test for leading and trailing whitespace and periods
	if (
		domain.trim() !== domain ||
		domain.startsWith(".") ||
		domain.endsWith(".")
	)
		return false;

	// split the domain at the periods, making sure at least 2
	let domainSubs = domain.split(".");
	if (domainSubs.length < 2) return false;
	// make sure both

	// loop through each sub and perform test for invalid chars
	// and leading/trailing whitespace and hyphens
	domainSubs.forEach(sub => {
		if (sub.trim() !== sub || sub.startsWith("-") || sub.endsWith("-"))
			return false;
		let regex = /^[a-z0-9-]+$/i;
		if (!sub.match(regex)) return false;
	});

	// Email passed!
	return true;
}

export const objCopy = obj => JSON.parse(JSON.stringify(obj));

export const deepCompare = (obj1, obj2) => {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export function convertNullsToEmpty(obj) {
	// obj could be array, object or as single value
	// use recursion to get to the single value and
	// replace any nulls with an empty space.
	// this is for setting state for forms
	if (Array.isArray(obj)) {
		// loop through array and call this function on each elementFromPoint
		return obj.map(val => convertNullsToEmpty(val));
	}
	if (obj !== null && typeof obj === "object") {
		// since we have already handled arrays, must be actual object
		Object.keys(obj).forEach(key => (obj[key] = convertNullsToEmpty(obj[key])));
		return obj;
	}
	// to be here, we have a scalar
	return obj !== null ? obj : "";
}

export function getDateStr(date) {
	// takes a javascript Date object and converts
	// into yyyy-MM-dd stringify

	if (isNaN(Date.parse(date))) {
		return "Invalid Date";
	}
	return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date
		.getDate()
		.toString()
		.padStart(2, "0")}`;
}

export function createDate(dateStr) {
	return new Date(dateStr + "T12:00:00");
}

export function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
}
