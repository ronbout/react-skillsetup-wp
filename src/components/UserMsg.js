import React from "react";
import MakePopup from "./hoc/MakePopup";

/**
 * Popup, draggable user message
 * parms:
 *    msg: main message to display
 *    msgHeader: header of display, default ''
 *    style: object of styles that will override
 *           any of the defautls
 * 		msgType: standard types with default styles
 * 						- std (default)
 * 						- warning
 * 		handleClose: required callBk for parent
 * 					 			 to close the msg
 */

const MsgDisplayComponent = ({
	msg,
	msgHeader = null,
	closeStyle = {},
	handleClose
}) => {
	const closeBtnStyle = {
		position: "absolute",
		top: "3px",
		right: "8px",
		fontWeight: "bold",
		fontSize: "20px",
		cursor: "pointer",
		...closeStyle
	};

	return (
		<div className="message-container">
			{msgHeader ? <h1>{msgHeader}</h1> : ""}
			{msg ? <div>{msg}</div> : ""}
			<div style={closeBtnStyle} onClick={() => handleClose()}>
				X
			</div>
		</div>
	);
};

const UserMsg = ({
	msg,
	msgHeader,
	msgStyle = {},
	msgType = "std",
	handleClose
}) => {
	let typeStyle;
	switch (msgType) {
		case "error":
			typeStyle = {
				backgroundColor: "orange",
				color: "white"
			};
			break;
		case "warning":
			typeStyle = {
				backgroundColor: "red",
				color: "white"
			};
			break;
		case "success":
			typeStyle = {
				backgroundColor: "green",
				color: "white"
			};
			break;
		default:
			typeStyle = {
				backgroundColor: "lightBlue",
				color: "black"
			};
	}
	const popupStyle = {
		padding: "1rem",
		width: "60%",
		top: "40%",
		left: "50%",
		textAlign: "center",
		transform: "translate(-50%, -50%)",
		...typeStyle,
		...msgStyle
	};

	// need to make sure that the close button has
	// the same colors as popupstyle
	const closeStyle = {
		...typeStyle,
		backgroundColor: popupStyle.backgroundColor,
		color: popupStyle.color
	};

	// need to make sure that the close button has the same colors
	closeStyle.backgroundColor = popupStyle.backgroundColor;
	closeStyle.color = popupStyle.color;

	const MsgPopup = MakePopup(MsgDisplayComponent, popupStyle, true);

	return (
		<MsgPopup
			msg={msg}
			msgHeader={msgHeader}
			closeStyle={closeStyle}
			handleClose={handleClose}
		/>
	);
};

export default UserMsg;
