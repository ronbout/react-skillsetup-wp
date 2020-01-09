import React from "react";
import { FontIcon } from "react-md";

const ListingHoc = ({
	data,
	actions = {},
	detailClassname = "row",
	callBacks = {},
	parms = {},
	children
}) => {
	// setup the detail component, which will be the only child

	return (
		<React.Fragment>
			{data.map((row, ndx) => {
				const detailRow = React.Children.map(children, child => {
					return React.cloneElement(child, {
						itemDetail: row,
						ndx: ndx,
						callBacks: callBacks,
						parms: parms
					});
				});
				return (
					<div key={ndx} className={detailClassname}>
						{detailRow}
						{actions.move && moveButtons(ndx)}
						{actions.delete && deleteButton(ndx)}
						{actions.edit && editButton(ndx)}
					</div>
				);
			})}
		</React.Fragment>
	);

	function moveButtons(ndx) {
		return (
			<React.Fragment>
				<div>
					<button
						type="button"
						className="btn btn-success btn-move"
						title="Move Row up"
						onClick={() => actions.move(ndx, ndx - 1)}
						disabled={ndx === 0}
					>
						<FontIcon>arrow_upward</FontIcon>
					</button>
				</div>
				<div>
					<button
						type="button"
						className="btn btn-success btn-move"
						title="Move Row Down"
						onClick={() => actions.move(ndx, ndx + 1)}
						disabled={ndx === data.length - 1}
					>
						<FontIcon>arrow_downward</FontIcon>
					</button>
				</div>
			</React.Fragment>
		);
	}

	function deleteButton(ndx) {
		return (
			<div>
				<button
					type="button"
					style={{ fontSize: "18px", width: "36px", height: "29.6px" }}
					className="btn btn-danger"
					title="Delete Row"
					onClick={() => actions.delete(ndx)}
				>
					X
				</button>
			</div>
		);
	}

	function editButton(ndx) {
		return (
			<div>
				<button
					type="button"
					title="Edit Row"
					className="btn btn-info"
					onClick={() => actions.edit(ndx)}
				>
					<FontIcon>edit</FontIcon>
				</button>
			</div>
		);
	}
};

export default ListingHoc;
