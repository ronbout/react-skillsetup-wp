/* DirtyModalMsg.js */
import React from "react";
import UserModalMsg from "components/UserModalMsg";

const DirtyModalMsg = ({ dirtyMsgString, yesAction, closeModal }) => {
	const msgBtns = [
		{
			display: "Yes",
			action: yesAction
		},
		{
			display: "No",
			action: closeModal
		}
	];

	return (
		<div>
			<UserModalMsg
				heading="Warning"
				subHeading={`You have unsaved changes`}
				msgBody={`Do you still want to ${dirtyMsgString}?`}
				btns={msgBtns}
				closeModalMsg={closeModal}
			/>
		</div>
	);
};

export default DirtyModalMsg;
