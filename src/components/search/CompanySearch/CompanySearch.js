/* CompanySearch.js */
import React from "react";
import TextField from "styledComponents/TextField";
import Button from "styledComponents/Button";
import { Card, CardTitle } from "styledComponents/Card";
import "./css/companySearch.css";

const CompanySearch = props => {
	const handleKeyPress = event => {
		if (event.key === "Enter") {
			event && event.preventDefault();
			props.handleSearch();
		}
	};

	const inputFields = () => {
		return (
			<React.Fragment>
				<div className="tsd-form-row">
					<TextField
						id="company-searchName"
						name="searchName"
						label="Name"
						value={props.state.formFields.searchName}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={handleKeyPress}
						autoComplete="new-password"
						autoFocus
					/>
				</div>
				<div className="tsd-form-row">
					<TextField
						id="company-searchPhone"
						name="searchPhone"
						label="Phone"
						value={props.state.formFields.searchPhone}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={handleKeyPress}
						autoComplete="new-password"
					/>
				</div>
				<div className="tsd-form-row">
					<TextField
						id="company-searchEmail"
						name="searchEmail"
						label="Email"
						value={props.state.formFields.searchEmail}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={handleKeyPress}
						autoComplete="new-password"
					/>
				</div>
			</React.Fragment>
		);
	};

	const resultListing = () => {
		return (
			<div className="div-select-container">
				{props.state.results.length && !props.state.loading ? (
					props.state.results.map((companyInfo, ndx) => {
						return (
							<div
								className={
									"div-select" +
									(props.state.companySelect === ndx ? " selected" : "")
								}
								key={ndx}
								data-value={ndx}
								onClick={() => props.handleCompanyClick(ndx)}
								onDoubleClick={props.handleSelect}
								title={
									companyInfo.email ? companyInfo.email : "No email available "
								}
							>
								{companyInfo.name}
							</div>
						);
					})
				) : props.state.loading ? (
					<p>Loading...</p>
				) : (
					<p>No results found</p>
				)}
			</div>
		);
	};

	const buttons = () => {
		return (
			<div>
				<Button
					type="button"
					variant="raised"
					className="btn btn-info"
					onClick={props.handleSearch}
				>
					Search
				</Button>
				<Button
					type="button"
					variant="raised"
					className="btn btn-primary"
					onClick={props.handleSelect}
					disabled={!props.state.results.length || props.state.loading}
				>
					Select
				</Button>
				<Button
					type="button"
					variant="raised"
					className="btn btn-warning"
					onClick={props.closeBtn}
				>
					Close
				</Button>
			</div>
		);
	};

	return (
		<Card className="company-search md-block-centered">
			<CardTitle title="Company Search" style={{ paddingBottom: "8px" }} />
			<div className="company-search-form">
				<fieldset>
					<legend>Search Criteria</legend>
					{inputFields()}
				</fieldset>
				{resultListing()}
				{buttons()}
			</div>
		</Card>
	);
};

export default CompanySearch;
