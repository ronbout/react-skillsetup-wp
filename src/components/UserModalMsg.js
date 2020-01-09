import React from "react";
import Button from "styledComponents/Button";
import Modal from "./Modal";

const ModalMsg = ({
	msgHeader,
	msgBody,
	btns,
	bodyStyle = {},
	btnStyle = {}
}) => {
	// btns = { btn.display, btn.action}

	const bStyle = {
		marginTop: "1rem",
		marginBottom: "1rem",
		padding: "0 1rem",
		...bodyStyle
	};

	const btnLiStyles = {
		listStyleType: "none",
		display: "inline-block",
		margin: "1rem 1rem"
	};

	btnStyle = {
		padding: "0.3rem 0.5rem",
		...btnStyle
	};

	return (
		<div>
			{msgHeader && <div className="msg-header">{msgHeader}</div>}
			<div style={bStyle} className="msg-body">
				{msgBody}
			</div>
			<div className="msg-btns">
				<ul style={{ paddingInlineStart: "0" }} className="btn-list">
					{btns.map((btn, ndx) => {
						return (
							<li style={btnLiStyles} className="msg-btn" key={ndx}>
								<Button
									variant="flat"
									style={btnStyle}
									onClick={btn.action}
									className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block md-btn--dialog"
								>
									{btn.display}
								</Button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

const UserModalMsg = ({
	heading = "",
	subHeading = "",
	msgBody,
	btns,
	msgStyles = {},
	closeModalMsg
}) => {
	// msgStyles can have 3 style objects: modal, body, btns
	const mStyles = msgStyles.modal || {};
	const modalStyles = {
		modal: {
			width: "auto",
			height: "auto",
			textAlign: "center",
			fontSize: "16px",
			color: "black",
			...mStyles
		}
	};

	return (
		<Modal
			modalHeader={heading}
			idName="user-input-modal"
			hideClose={true}
			styles={modalStyles}
			handleCloseModal={closeModalMsg}
		>
			<ModalMsg
				msgHeader={subHeading}
				msgBody={msgBody}
				btns={btns}
				bodyStyle={msgStyles.body || {}}
				btnStyle={msgStyles.btn || {}}
			/>
		</Modal>
	);
};

export default UserModalMsg;
