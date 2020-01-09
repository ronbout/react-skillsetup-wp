import React, { useReducer } from "react";

const FormsContext = React.createContext([{}, () => {}]);

const FormsProvider = props => {
	const formState = {
		onChangeFn: null,
		onSubmitFn: null,
		resetErrMsg: false,
		errMsg: { email1: "Hello, Watson" }
	};

	const formsReducer = (state, action) => {
		switch (action.type) {
			case "setOnChangeFn":
				return { ...state, onChangeFn: action.payload };
			case "setOnSubmitFn":
				return { ...state, onSubmitFn: action.payload };
			case "setErrMsg":
				return {
					...state,
					errMsg: {
						...state.errMsg,
						[action.payloadproperty]: action.payload.msg
					}
				};
			case "setErrObj":
				return { ...state, errMsg: action.payload };
			case "resetErrMsg":
				return { ...state, errMsg: {}, resetErrMsg: action.payload };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(formsReducer, formState);

	return (
		<FormsContext.Provider value={{ state, dispatch }}>
			{props.children}
		</FormsContext.Provider>
	);
};

export { FormsContext, FormsProvider };
