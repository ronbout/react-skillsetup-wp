/**
 * dataFetch is a generic fetch function that uses async await
 * and will clean up the fetch routines so that all have a standard
 * code.  It will use try/catch for error handling.
 */

import { convertNullsToEmpty } from "./library.js";

const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";
const API_COMPANY = "companies";
const API_PERSON = "persons";

export default async function dataFetch(
	endpoint,
	queryStr = "",
	httpMethod = "GET",
	body = null,
	formData = false
) {
	const urlBase = window.apiUrl;

	let basicUrl = `${urlBase}${endpoint}${API_QUERY}${queryStr}`;
	let headers = formData
		? {}
		: { headers: { "Content-Type": "application/json" } };

	let httpConfig = body
		? {
				method: httpMethod,
				body: formData ? body : JSON.stringify(body),
				...headers
		  }
		: {};

	try {
		const response = await fetch(basicUrl, httpConfig);
		let result = await response.json();
		if (result.error) {
			return result;
		} else {
			result = convertNullsToEmpty(result.data);
			return result;
		}
	} catch (error) {
		console.log("Fetch error: ", error);
		return { error: error };
	}
}

export async function fetchCompany(id) {
	const endpoint = `${API_COMPANY}/${id}`;
	const company = await dataFetch(endpoint);
	return company;
}

export async function fetchPerson(id) {
	const endpoint = `${API_PERSON}/${id}`;
	const person = await dataFetch(endpoint);
	return person;
}
