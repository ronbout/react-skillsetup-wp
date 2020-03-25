/* RelatedItemList.js */
import React from "react";

import ListingHoc from "components/hoc/ListingHoc";
import RelatedItemDetail from "./RelatedItemDetail";

const RelatedItemList = props => {
	const handleDelete = ndx => {
		props.handleDelItem(props.skillFieldName, ndx);
	};

	// must set up actions for listing hoc
	const actions = {
		delete: handleDelete
	};
	return (
		<React.Fragment>
			<h2>{props.heading} List</h2>
			<div className="md-grid">
				<div className="md-cell--4">{props.heading} Name</div>
				<div className="md-cell--5">Description</div>
				<div className="md-cell--1">Delete</div>
			</div>
			<ListingHoc
				data={props.items}
				actions={actions}
				detailClassname="md-grid related-row"
			>
				<RelatedItemDetail />
			</ListingHoc>
		</React.Fragment>
	);
};

export default RelatedItemList;
