import React, { Component } from "react";

import TechtagSelect from "./TechtagSelect";
import dataFetch from "../../assets/js/dataFetch";

const API_TAGS = "techtags";

const clearFormFields = {
  formFields: {
    keyword: "",
    tagSelect: ""
  }
};

class TechtagSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...clearFormFields,
      apiBase: window.apiUrl
    };
  }

  componentDidMount() {
    // need to load techtags.  just load once.
    // they are not being updated programmatically
    if (this.props.tagOptions) {
      this.setState({
        tagOptions: this.props.tagOptions
      });
    } else {
      this.loadTechtags();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tagOptions &&
      JSON.stringify(this.props.tagOptions) !==
        JSON.stringify(prevProps.tagOptions)
    ) {
      this.setState({
        tagOptions: this.props.tagOptions
      });
    }
  }

  setTagOptions = () => {};

  loadTechtags = async () => {
    const endpoint = API_TAGS;
    const result = await dataFetch(endpoint);
    if (result.error) {
      console.log("Error loading techtags for select list: ", result);
    } else {
      this.setState({
        tagOptions: result ? result : []
      });
    }
  };

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      formFields: {
        ...this.state.formFields,
        [target.name]: target.value
      }
    });
  };

  handleTagClick = (ndx, event) => {
    this.setState({
      formFields: {
        ...this.state.formFields,
        tagSelect: ndx
      }
    });
  };

  handleDragStart = (tagInfo, event) => {
    this.handleTagClick(tagInfo.ndx, event);
    this.props.handleTagStartDrag(tagInfo);
  };

  handleSelect = () => {
    const selectTagInfo = this.state.tagOptions[
      this.state.formFields.tagSelect
    ];
    // if a prop was passed down to handle the skill select, call it
    this.props.handleAddTag && this.props.handleAddTag(selectTagInfo);
  };

  render() {
    return (
      <TechtagSelect
        state={this.state}
        handleInputChange={this.handleInputChange}
        handleTagClick={this.handleTagClick}
        handleDragStart={this.handleDragStart}
        handleSelect={this.handleSelect}
        {...this.props}
      />
    );
  }
}

export default TechtagSelectContainer;
