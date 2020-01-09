import React from "react";
import { DialogContainer as MdDialogContainer } from "react-md";

const DialogContainer = ({ style, dialogStyle, ...props }) => {
	return (
		<MdDialogContainer
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				...style
			}}
			dialogStyle={{
				transform: "none",
				left: "auto",
				top: "auto",
				...dialogStyle
			}}
			{...props}
		/>
	);
};

export default DialogContainer;
