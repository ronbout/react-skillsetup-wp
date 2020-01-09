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
			<div className="row">
				<div className="col-sm-4">{props.heading} Name</div>
				<div className="col-sm-5">Description</div>
				<div className="col-sm-1">Delete</div>
			</div>
			<ListingHoc
				data={props.items}
				actions={actions}
				detailClassname="row related-row"
			>
				<RelatedItemDetail />
			</ListingHoc>
		</React.Fragment>
	);
};

export default RelatedItemList;
