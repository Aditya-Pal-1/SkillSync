import { Link } from "react-router-dom";
import { ArrowUpRight, Award } from "lucide-react";


const SkillCard = ({ skill }) => (
  <article className="skill-card">
    {skill.image?.url ? (
      <img src={skill.image.url} alt={skill.name} className="skill-image" />
    ) : (
      <div className="skill-image-empty"><Award size={38}/></div>
    )}
    <div className="skill-body">
      <div className="skill-top">
        <h2 className="skill-name">{skill.name}</h2>
        <span className="skill-level">{skill.level}</span>
      </div>
      <p className="skill-description">{skill.description || "Learn practical skills through a focused one-to-one session."}</p>
      <div className="skill-footer">
        <span className="result-count">Mentor-led session</span>
        <Link to={`/skills/${skill._id}`} className="skill-link">View times <ArrowUpRight size={14} style={{verticalAlign:"middle"}}/></Link>
      </div>
    </div>
  </article>
);
export default SkillCard;
