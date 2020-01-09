import React from "react";

const SkillTree = ({ skillTree, treeType }) => {
  const buildSkillBranch = skillArray => {
    const lis = skillArray.reduce((liArray, skill) => {
      liArray = [
        ...liArray,
        <div key={skill.id} className="skill-li" title={skill.id}>
          {skill.name}
          {skill[treeType] && buildSkillBranch(skill[treeType])}
        </div>
      ];
      return liArray;
    }, []);
    return lis;
  };

  return (
    <div className="skillTree">{skillTree && buildSkillBranch(skillTree)}</div>
  );
};

export default SkillTree;
