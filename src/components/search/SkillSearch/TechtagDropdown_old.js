import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TechtagDropdown = ({
  tagOptions,
  openTagOptions,
  tagSelect,
  handleTagSelect
}) => {
  const displayTechtagSelect = () => {
    const tagList = tagOptions ? tagOptions : [];
    const optionHeight = 23;
    const OptionRows = Math.min(10, tagList.length);
    let divHeight = openTagOptions ? optionHeight * OptionRows + 6 : 30;
    return (
      <div className="div-select-container" style={{ height: divHeight }}>
        {(tagSelect === -1 || openTagOptions) && (
          <div
            className="div-select d-flex justify-content-between tag-option"
            key={-1}
            data-value="-1"
            onClick={() => handleTagSelect(-1)}
            value="-1"
          >
            <div>
              {tagSelect === -1
                ? "Select Techtag to Filter Skills"
                : "Remove Techtag Filter"}
            </div>

            <div>
              <FontAwesomeIcon icon="chevron-down" /> &nbsp;
            </div>
          </div>
        )}
        {tagOptions ? (
          tagOptions.map((tagInfo, ndx) => {
            return (
              (openTagOptions || tagSelect === ndx) && (
                <div
                  className={
                    "div-select d-flex justify-content-between tag-option" +
                    (tagSelect === ndx ? " selected" : "")
                  }
                  key={ndx}
                  data-value={ndx}
                  onClick={() => handleTagSelect(ndx)}
                  title={tagInfo.description}
                >
                  <div>{tagInfo.name}</div>
                  <div>
                    {tagSelect === ndx && !openTagOptions && (
                      <FontAwesomeIcon icon="chevron-down" />
                    )}
                    &nbsp;
                  </div>
                </div>
              )
            );
          })
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  };

  return <div className="form-group">{displayTechtagSelect()}</div>;
};

export default TechtagDropdown;
