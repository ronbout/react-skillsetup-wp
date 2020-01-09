import React, { useState } from "react";

import SkillTree from "./SkillTree";

const SkillTreeContainer = ({ parentTree, childTree }) => {
  const [treeType, setTreeType] = useState("parent");

  const handleRadioChange = ev => {
    setTreeType(ev.target.value);
  };

  return (
    <div className="tree-container">
      <div className="skill-tree-radio">
        <label>
          <input
            type="radio"
            name="treeRadio"
            value="parent"
            checked={treeType === "parent"}
            onChange={handleRadioChange}
          />
          Parent Tree
        </label>
        <label>
          <input
            type="radio"
            name="treeRadio"
            value="child"
            checked={treeType === "child"}
            onChange={handleRadioChange}
          />
          Child Tree
        </label>
      </div>
      <SkillTree
        skillTree={treeType === "parent" ? parentTree : childTree}
        treeType={treeType === "parent" ? "parents" : "children"}
      />
    </div>
  );
};

export default SkillTreeContainer;
