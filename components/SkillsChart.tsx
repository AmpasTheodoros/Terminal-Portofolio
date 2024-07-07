// app/components/SkillsChart.tsx
import React from 'react';

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'Python', level: 70 },
];

const SkillsChart: React.FC = () => {
  return (
    <div className="skills-chart">
      {skills.map((skill) => (
        <div key={skill.name} className="skill-bar">
          <div className="skill-name">{skill.name}</div>
          <div className="skill-level" style={{ width: `${skill.level}%` }}>
            {skill.level}%
          </div>
        </div>
      ))}
      <style jsx>{`
        .skills-chart {
          width: 100%;
          max-width: 500px;
        }
        .skill-bar {
          margin-bottom: 10px;
          background-color: #333;
          border-radius: 4px;
          overflow: hidden;
        }
        .skill-name {
          padding: 5px;
          color: white;
        }
        .skill-level {
          background-color: #4CAF50;
          color: white;
          text-align: right;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default SkillsChart;