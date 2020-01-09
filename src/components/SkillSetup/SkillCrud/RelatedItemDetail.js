import React from "react";

const RelatedItemDetail = props => {
  return (
    <React.Fragment>
      <input
        className="col-sm-4"
        type="text"
        name={"skillrelated-" + props.ndx}
        value={props.itemDetail.name}
        disabled
      />
      <input
        className="col-sm-5"
        type="text"
        name={"skillrelated-desc-" + props.ndx}
        value={props.itemDetail.description}
        disabled
      />
    </React.Fragment>
  );
};

export default RelatedItemDetail;
