/**
 * getSkillsFromTree is a function that is shared by
 * two Components so placing it at top of the
 * SkillSetup directory structure
 */

const getSkillsFromTree = (
  skillList,
  relationType = "parents",
  fullList = []
) => {
  let objectName = relationType === "parents" ? "parents" : "children";

  return skillList
    .reduce((sArray, skill) => {
      !fullList.includes(skill.id) &&
        sArray.push(skill.id) &&
        fullList.push(skill.id);
      if (skill[objectName] && skill[objectName].length) {
        sArray.push(
          getSkillsFromTree(skill[objectName], relationType, fullList)
        );
      }
      return sArray;
    }, [])
    .flat(Infinity);
};

export default getSkillsFromTree;
