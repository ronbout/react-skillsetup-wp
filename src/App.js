import React, { Component } from "react";

import "./css/styles.css";
import "./css/app.css";

import SkillSetup from "components/SkillSetup/";

/*
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
	faQuestion,
	faSearch,
	faArrowUp,
	faArrowDown,
	faChevronDown,
	faEdit,
	faPlus,
	faCheck,
	faArrowsAltV,
	faCogs
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faQuestion,
	faSearch,
	faArrowUp,
	faArrowDown,
	faChevronDown,
	faEdit,
	faPlus,
	faCheck,
	fab,
	faArrowsAltV,
	faCogs
);
*/

// setup global api url
// will be coming from wp react page
// through window.apiLoc

const API_HOST = window.apiLoc === "local" ? "localhost" : "13.90.143.153";

window.imgLoc = `http://${API_HOST}/3sixd/imgs/`;
window.apiUrl = `http://${API_HOST}/3sixd/api/`;
window.resumeUrl = `http://${API_HOST}/3sixd/resume-build/resume-pdf.php`;

class App extends Component {
	render() {
		return <SkillSetup />;
	}
}

export default App;
