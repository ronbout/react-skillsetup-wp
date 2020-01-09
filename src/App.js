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
// if not on my dev, use remote api
// const API_LOC = "local";
// const API_LOC = "local";
const API_LOC = "local";

if (API_LOC === "local") {
	window.imgLoc = "http://localhost/3sixd/imgs/";
	window.apiUrl = "http://localhost/3sixd/api/";
} else {
	window.imgLoc = "http://13.90.143.153/3sixd/imgs/";
	window.apiUrl = "http://13.90.143.153/3sixd/api/";
}

//window.resumeUrl = "http://localhost/3sixd/resume-build/resume-pdf.php";
window.resumeUrl = "http://13.90.143.153/3sixd/resume-build/resume-pdf.php";

class App extends Component {
	render() {
		return <SkillSetup />;
	}
}

export default App;
