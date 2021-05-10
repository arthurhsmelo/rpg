import Tooltip from "components/@shared/tooltip/Tooltip.component";
import React from "react";
import "./SkillsList.scss";

export interface SkillsListProps {
  skills: Array<{
    name: string;
    value: number;
  }>;
}

const SkillDetails: React.FC<{
  name: string;
  value: number;
}> = ({ name, value }) => (
  <div className="SkillDetails">
    <div className="SkillDetails-name">
      <span>
        <b>{name}</b>
      </span>
      <span>{value}</span>
    </div>
  </div>
);

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  return (
    <div className="SkillsList">
      <div className="SkillsList-title">
        <span>Skills</span>
      </div>
      {skills.map((skill) => (
        <Tooltip content={<SkillDetails {...skill} />} key={skill.name}>
          <div className="Skill">
            <span className="Skill-name">{skill.name}</span>
            <span className="Skill-value">{skill.value}</span>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default SkillsList;
