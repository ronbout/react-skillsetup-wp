import React, { Component } from "react";

import "./css/tabbedUI.css";

const TabList = props => {
	const { activeIndex } = props;

	const children = React.Children.map(props.children, (child, index) => {
		return React.cloneElement(child, {
			activeTab: index === activeIndex,
			activateTab: () => props.activateTab(index),
			callBk: props.callBk,
			ndx: index
		});
	});
	return <ul className="tab-list">{children}</ul>;
};

const Tab = props => {
	const classes = props.activeTab ? "tab active-tab" : "tab";
	const clickCallBk = ndx => {
		props.callBk && props.callBk(ndx);
	};
	return (
		<li
			className={classes}
			onClick={() => {
				props.activateTab();
				clickCallBk(props.ndx);
			}}
		>
			{props.children}
		</li>
	);
};

const TabPanels = props => {
	return <div className="tab-section">{props.children[props.activeIndex]}</div>;
};

const TabPanel = props => {
	return <React.Fragment>{props.children}</React.Fragment>;
};

class TabbedUI extends Component {
	constructor(props) {
		super(props);
		const { activeIndex = 0 } = props;
		this.state = {
			activeIndex
		};
	}

	activateTab = tabIndex => {
		if (tabIndex === this.state.activeIndex) return;
		this.setState({
			activeIndex: tabIndex
		});
	};

	render() {
		const children = React.Children.map(this.props.children, child => {
			if (child.type === TabPanels) {
				return React.cloneElement(child, {
					activeIndex: this.state.activeIndex
				});
			} else if (child.type === TabList) {
				return React.cloneElement(child, {
					activeIndex: this.state.activeIndex,
					activateTab: this.activateTab
				});
			} else {
				return child;
			}
		});
		return <div>{children}</div>;
	}
}

export { TabbedUI, TabList, Tab, TabPanels, TabPanel };
