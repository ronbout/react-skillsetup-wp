import React, { useState, useEffect, useContext, useCallback } from "react";
import Button from "styledComponents/Button";
import UserModalMsg from "components/UserModalMsg";
import { objCopy, deepCompare } from "assets/js/library";
import { FormsContext } from "./FormsContext";
import { isEqual } from "lodash";
import { usePrevious } from "components/hooks/usePrevious";

import "./css/forms.css";

/**
 *
 * This is the useForm Hook
 * @param {*} startValues
 * @param {*} clearValues
 * @param {*} submitCb
 */
export const useForm = (startValues, clearValues, submitCb, validCb) => {
	const [values, setValues] = useState(objCopy(startValues));
	const [origValues, setOrigValues] = useState(objCopy(startValues));
	const [dispModalMsg, setDispModalMsg] = useState(false);
	const [dirtyMsgString, setDirtyMsgString] = useState("clear the form");
	const [errors, setErrors] = useState([]);
	const { state, dispatch } = useContext(FormsContext);

	const prevOrigValues = usePrevious(origValues);
	const prevValues = usePrevious(values);

	useEffect(() => {
		if (!isEqual(origValues, prevOrigValues)) {
			dispatch({ type: "resetErrMsg", payload: true });
		}
	}, [origValues, dispatch, prevOrigValues]);

	const clearForm = () => {
		setValues({ ...clearValues });
		setOrigValues({ ...objCopy(clearValues) });
		dispatch({ type: "resetErrMsg", payload: true });
		setDispModalMsg(false);
	};

	const cancelForm = () => {
		setValues({ ...origValues });
		dispatch({ type: "resetErrMsg", payload: true });
	};

	const closeModalMsg = () => {
		setDispModalMsg(false);
	};

	const [msgBtns, setMsgBtns] = useState([
		{
			display: "Yes",
			action: clearForm
		},
		{
			display: "No",
			action: closeModalMsg
		}
	]);

	useEffect(() => {
		setOrigValues(objCopy(startValues));
		setValues(objCopy(startValues));
	}, [startValues]);

	useEffect(() => {
		if (!isEqual(values, origValues) && state.resetErrMsg) {
			dispatch({ type: "resetErrMsg", payload: false });
		}
	}, [values, origValues, prevValues, dispatch, state.resetErrMsg]);

	/**
	 * These are the methods that can be performed on the form
	 * and its input elements
	 */
	const submitForm = useCallback(
		ev => {
			ev.preventDefault && ev.preventDefault();
			const errorList = validCb ? validCb(values) : [];
			errorList && errorList.length && setErrors(errorList);
			if (!errorList.length) {
				setOrigValues(objCopy(values));
				submitCb(values);
			}
		},
		[submitCb, values, validCb]
	);

	const handleChange = React.useCallback(ev => {
		let field = ev.target.name;
		const val =
			ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
		// some of the more advanced forms have objects within objects,
		// which would not work with the standard handle input routine
		// in those cases, the input field's name will contain the
		// subObject name and the field name separated by a hyphen
		// i.e. name="person-name" is values.person.name in the data

		if (field.indexOf("-") !== -1) {
			setValues(prev => {
				let tmpValues = objCopy(prev);
				const targetName = field.split("-");
				tmpValues[targetName[0]][targetName[1]] = val;
				return tmpValues;
			});
		} else {
			setValues(prev => {
				return { ...prev, [field]: val };
			});
		}
	}, []);

	// in some cases, the values (formFields) need to be changed by hand
	// in the form.  this provides access to that.
	const changeFormFields = (name, value) => {
		// have to convert to event to pass to handleChange
		handleChange({ target: { name, value } });
	};

	useEffect(() => {
		dispatch({ type: "setOnChangeFn", payload: handleChange });
		dispatch({ type: "setOnSubmitFn", payload: submitForm });
	}, [dispatch, submitForm, handleChange]);

	/**
	 * This is the code for the dirty form check
	 */

	// this function can be called to check if form is dirty
	const checkDirtyForm = () => {
		return deepCompare(origValues, values) ? false : true;
	};

	const checkDirtyFormCallbk = callBk => {
		const dirty = checkDirtyForm();
		if (dirty) {
			openModalMsg();
		} else {
			callBk();
		}
		return dirty;
	};

	const openModalMsg = () => {
		setDispModalMsg(true);
	};

	const dirtyMsg = dispModalMsg ? (
		<div>
			<UserModalMsg
				heading="Warning"
				subHeading={`You have unsaved changes`}
				msgBody={`Do you still want to ${dirtyMsgString}?`}
				btns={msgBtns}
				closeModalMsg={closeModalMsg}
			/>
		</div>
	) : (
		""
	);

	/**
	 * These are the jsx Components
	 */

	const BtnSubmit = ({ enabled, ...props }) => {
		const disp = props.children ? props.children : "Submit";
		const disabled =
			!enabled && (props.disabled || isEqual(values, origValues));
		return (
			<Button type="submit" {...props} disabled={disabled}>
				{disp}
			</Button>
		);
	};

	const BtnClear = ({
		children = "Clear",
		onClick,
		checkDirty = false,
		...props
	}) => {
		const onClear = checkDirty
			? () => {
					setDirtyMsgString("clear the form");
					setMsgBtns(prev => {
						let [btn1, btn2] = prev;
						btn1 = {
							...btn1,
							action: () => {
								onClick && onClick();
								clearForm();
								setDispModalMsg(false);
							}
						};
						return [btn1, btn2];
					});
					checkDirtyFormCallbk(() => {
						onClick && onClick();
						clearForm();
					});
			  }
			: () => {
					onClick && onClick();
					clearForm();
			  };

		return (
			<Button
				type="button"
				btnType="warning"
				onClick={onClear}
				onMouseDown={onClear}
				{...props}
			>
				{children}
			</Button>
		);
	};

	const BtnCancel = ({
		children = "Cancel",
		checkDirty = false,
		onCancel = cancelForm,
		...props
	}) => {
		const onClick = checkDirty
			? () => {
					setDirtyMsgString("cancel");
					setMsgBtns(prev => {
						let [btn1, btn2] = prev;
						btn1 = {
							...btn1,
							action: () => {
								//onCancel();
								cancelForm();
								setDispModalMsg(false);
							}
						};
						return [btn1, btn2];
					});
					checkDirtyFormCallbk(onCancel);
			  }
			: onCancel;
		return (
			<Button
				type="button"
				btnType="secondary"
				onClick={onClick}
				onMouseDown={onClick}
				disabled={onCancel === cancelForm && !checkDirtyForm()}
				{...props}
			>
				{children}
			</Button>
		);
	};

	return {
		formFields: values,
		clearForm,
		BtnSubmit,
		BtnClear,
		BtnCancel,
		checkDirtyForm,
		dirtyMsg,
		errors,
		changeFormFields
	};
};

/**
 * End of UseForm Hook
 */
