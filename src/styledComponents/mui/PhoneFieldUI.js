import React from "react";
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/dist/style.css";
import MuiPhoneNumber from "material-ui-phone-number";

const PhoneFieldUI = ({ name, value, errMsg, label = "", ...rest }) => {
	return <MuiPhoneNumber name={name} value={value} label={label} {...rest} />;
};

export default PhoneFieldUI;
