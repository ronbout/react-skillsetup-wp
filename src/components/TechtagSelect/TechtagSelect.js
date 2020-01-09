import React from "react";

import "./css/techtag.css";

// IE polyfill for includes function
// ******** need to create a library of reusable functions
// move this into that.
/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, "includes", {
    value: function(search, start) {
      if (typeof start !== "number") {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    }
  });
}

const TechtagSelect = props => {
  let tagList = props.state.tagOptions
    ? props.state.tagOptions
        .map((tag, ndx) => {
          // have to add the tagOptions array ndx to the
          // filtered version so that the correct tag is pulled
          // from the list as the indices will change from filtering
          tag.ndx = ndx;
          return tag;
        })
        .filter(tag => {
          return (
            (props.state.formFields.keyword === "" ||
              tag.name
                .toLowerCase()
                .includes(props.state.formFields.keyword.toLowerCase())) &&
            // if the tag is already in the skills list, do not display
            !props.skillTagsList.find(skillTag => {
              return skillTag.id === tag.id;
            })
          );
        })
    : [];

  // calculate the height of the fake <select>
  // each div is 23px tall (if this changes, recalc)
  const optionHeight = 23;
  const OptionRows = Math.min(10, tagList.length);
  let divHeight = optionHeight * OptionRows + 6;
  return (
    <div className="tag-select">
      <h2>Add Tech Tags</h2>
      {/* search field for techtags which will filter select */}
      {!props.hideFilter && (
        <div className="form-group">
          <label htmlFor="keyword">
            Select (Double Click) to Add or Drag and Drop
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            name="keyword"
            id="keyword"
            placeholder="Enter term to search Techtags"
            value={props.state.formFields.keyword}
            onChange={props.handleInputChange}
          />
        </div>
      )}

      {/* Techtag List returned from api */}
      <div className="div-select-container" style={{ maxHeight: divHeight }}>
        {props.state.tagOptions &&
          tagList.map(tagInfo => {
            return (
              <div
                className={
                  "div-select" +
                  (props.state.formFields.tagSelect === tagInfo.ndx
                    ? " selected"
                    : "")
                }
                key={tagInfo.ndx}
                data-value={tagInfo.ndx}
                draggable={true}
                onDragStart={() => props.handleDragStart(tagInfo)}
                onClick={() => props.handleTagClick(tagInfo.ndx)}
                onDoubleClick={props.handleSelect}
                title={
                  tagInfo.description
                    ? tagInfo.description
                    : "No description available "
                }
              >
                {tagInfo.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TechtagSelect;
