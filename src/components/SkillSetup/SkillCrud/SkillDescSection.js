import React from "react";

const SkillDescSection = props => {
  return (
    <div className="skill-desc-form-section">
      <h2>Skill View/Entry</h2>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label" htmlFor="name">
          Skill Name: *
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={props.formFields.name}
            onChange={props.handleInputChange}
            required
          />
        </div>
        <div className="col-sm-4">
          <p>( * - required field )</p>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label" htmlFor="description">
          Description:
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="description"
            id="description"
            value={props.formFields.description}
            onChange={props.handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label" htmlFor="url">
          URL:
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="url"
            id="url"
            value={props.formFields.url}
            onChange={props.handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillDescSection;
