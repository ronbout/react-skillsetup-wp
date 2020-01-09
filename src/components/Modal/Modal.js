import React from "react";
import Button from "styledComponents/Button";
import "./css/modal.css";

const Modal = props => {
	React.useEffect(() => {
		document.body.classList.add("tsd-modal-open");
		return () => {
			document.body.classList.remove("tsd-modal-open");
		};
	}, []);

	const handleCloseModal = () => {
		props.handleCloseModal && props.handleCloseModal();
	};

	// can pass in override styles with styles object containing
	// objects for each of the modal sections: styles.modal,
	// styles.modalHeader, styles.modalContent, styles.modalFooter
	const styles = props.styles || {};

	return (
		<div className="tsd-modal-overlay">
			<div
				className="tsd-modal"
				id={props.idName || "tsd-modal"}
				tabIndex="-1"
				style={styles.modal || {}}
			>
				{props.modalHeader && (
					<div className="tsd-modal-header" style={styles.modalHeader || {}}>
						<h3>{props.modalHeader}</h3>
					</div>
				)}

				<div className="tsd-modal-content" style={styles.modalContent || {}}>
					{props.children || <h2>Inside Modal</h2>}
				</div>
				{props.hideClose || (
					<div className="tsd-modal-footer" style={styles.modalFooter || {}}>
						<Button
							type="button"
							className="btn btn-secondary"
							onClick={handleCloseModal}
						>
							Close
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
