/**
 * Standard validation routines for form Input Components
 */

export function isEmail(email) {
	// empty email is not invalid
	if (!email) return true;

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

export function isUrl(url) {
	if (url === "") return true;
	const testUrl = url.toString();
	const urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

	return testUrl.match(urlReg);
}

export function isZipcode(zip) {
	if (zip === "") return true;
	if (zip.length < 2) return false;
	const urlReg = /^[a-z0-9]+$/i;

	return zip.toString().match(urlReg);
}

export function convertNameToProperty(name) {
	return name.replace(/-/g, "_");
}
