import React, { useState } from "react";

import "./css/selectList.css";

const SelectList = props => {
  const [selectRow, setSelectRow] = useState(0);

  const handleRowClick = ndx => {
    setSelectRow(ndx);
  };

  return (
    <div className="select-list">
      <div className="div-select-container" style={{}}>
        {props.dataList.map((data, ndx) => {
          return (
            <div
              className={"div-select" + (selectRow === ndx ? " selected" : "")}
              key={ndx}
              data-value={ndx}
              draggable={false}
              onDragStart={() => props.handleDragStart(data)}
              onClick={() => handleRowClick(ndx)}
              onDoubleClick={() => props.handleRowSelect(ndx)}
              title={data.hover ? data.hover : "No description available "}
            >
              {data.display}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectList;
