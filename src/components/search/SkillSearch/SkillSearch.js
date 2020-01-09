import React from "react";
import TechtagDropdown from "./TechtagDropdown";
import SearchBar from "styledComponents/SearchBar";
import Button from "styledComponents/Button";
import { convertHtmlToText } from "assets/js/library";
import { Card, CardTitle, CardText } from "styledComponents/Card";
import "./css/skillSearch.css";

const SkillSearch = props => {
	const handleKeyPress = event => {
		if (event.key === "Enter") {
			event && event.preventDefault();
			props.handleSearch();
		}
	};

	return (
		<Card className="skill-search md-block-centered">
			<CardTitle title="Skill Search" style={{ paddingBottom: "8px" }} />

			<CardText style={{ paddingTop: 0 }}>
				{props.state.userMsg && (
					<div className="skill-search-msg">{props.state.userMsg}</div>
				)}
				{props.state.errMsg && (
					<div className="skill-search-error">{props.state.errMsg}</div>
				)}

				<div className="skill-search-form">
					{/* techtag <select> for filter */}
					<TechtagDropdown
						tagOptions={props.state.tagOptions}
						openTagOptions={props.state.openTagOptions}
						tagSelect={props.state.formFields.tagSelect}
						handleTagSelect={props.handleTagSelect}
					/>

					{/* keyword entry */}

					{/**
					 *
					 *
					 *
					 * REPLACE WITH TEXTFIELD AND SEARCH FontAwesomeIcon
					 *
					 *
					 */}
					<SearchBar
						id="skills-search"
						label="Search Skills"
						textProps={{
							value: props.state.formFields.keyword,
							onChange: (val, e) => props.handleInputChange(e),
							onKeyPress: handleKeyPress
						}}
						onSearch={props.handleSearch}
					/>
					{/*}
					<div className="search-field-div">
						<label htmlFor="keyword">
							<strong>Search Skills</strong>
						</label>
						<div id="skill-search-row" className="row mx-0">
							<input
								type="text"
								className="form-control"
								name="keyword"
								id="keyword"
								value={props.state.formFields.keyword}
								onChange={props.handleInputChange}
								onKeyPress={handleKeyPress}
							/>
							<button
								type="button"
								className="btn btn-dark btn-search mx-1"
								onClick={props.handleSearch}
							>
								<FontAwesomeIcon icon="search" />
							</button>
						</div>
					</div>
					{/* skill List returned from search api */}
					<div className="div-select-container" style={{ height: "300px" }}>
						{props.state.skillOptions && !props.state.loading ? (
							props.state.skillOptions.length === 0 ? (
								<div-select>No records found</div-select>
							) : (
								props.state.skillOptions.map((skillInfo, ndx) => {
									return (
										<div
											className={
												"div-select" +
												(props.state.formFields.skillSelect === ndx
													? " selected"
													: "")
											}
											key={ndx}
											data-value={ndx}
											draggable={true}
											onDragStart={event =>
												props.handleDragStart(skillInfo, ndx, event)
											}
											onDragEnd={event => event.stopPropagation()}
											onClick={() => props.handleSkillClick(ndx)}
											onDoubleClick={props.handleSelect}
											title={
												`Skill Id: ${skillInfo.id}` +
												convertHtmlToText("&#013;&#010;") +
												(skillInfo.description
													? skillInfo.description
													: "No description available ") +
												convertHtmlToText("&#013;&#010;") +
												(skillInfo.url ? "URL: " + skillInfo.url : "")
											}
										>
											{skillInfo.name}
										</div>
									);
								})
							)
						) : (
							<p>Loading....</p>
						)}
					</div>
					<p>Hover over skill for more details</p>
					{/* Select and, if prop, Close Buttons */}
					<div
						className="search-skills-buttons mt-3"
						style={{ textAlign: "center" }}
					>
						<Button
							type="button"
							variant="raised"
							color="primary"
							onClick={props.handleSelect}
							disabled={
								!(
									props.state.skillOptions &&
									props.state.skillOptions.length > 0
								) || props.editMode === 1
							}
						>
							{props.searchButton}
						</Button>
						{props.state.closeBtn && (
							<Button
								type="button"
								variant="raised"
								className="btn btn-info"
								onClick={props.state.closeBtn}
							>
								Close
							</Button>
						)}
					</div>
				</div>
			</CardText>
		</Card>
	);
};

export default SkillSearch;
