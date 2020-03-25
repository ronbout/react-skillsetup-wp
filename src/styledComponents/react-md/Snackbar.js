import React, { useState } from "react";
import { Snackbar as MdSnackbar } from "react-md";

const Snackbar = ({
	text,
	action = null,
	autohide = true,
	timeout = null,
	style = {},
	...rest
}) => {
	const [toasts, setToasts] = useState([{ text, action }]);

	const removeToast = () => {
		setToasts([]);
		//closeCallBk();
	};

	const toastStyle = {
		zIndex: 1100,
		...style
	};

	return (
		<MdSnackbar
			id="snackbar"
			toasts={toasts}
			autohide={autohide}
			onDismiss={removeToast}
			autohideTimeout={timeout || 1500}
			style={toastStyle}
			{...rest}
		/>
	);
};

export default Snackbar;
