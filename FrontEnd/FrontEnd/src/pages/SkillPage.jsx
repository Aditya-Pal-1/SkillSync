import { useState } from "react";
import { Search, SlidersHorizontal, RotateCcw, Plus } from "lucide-react";
import SkillCard from "../Components/SkillCard.jsx";
import { fetchSkills } from "../api/skills.js";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import AddSkillForm from "./AddSkillform.jsx";
import { useAuth } from "../context/authContext.jsx";

const SkillsPage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [available, setAvailable] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const { data: result, isLoading, error, isFetching } = useQuery({
    queryKey: ["skills", { page, search, level, available, sort }],
    queryFn: () => fetchSkills({ page, limit: 10, search, level, available, sort }),
    placeholderData: keepPreviousData,
  });
  const skills = result?.data ?? [];
  const totalPages = result?.pagination?.pages ?? 1;
  const clear = () => { setSearch(""); setLevel(""); setAvailable(""); setSort("-createdAt"); setPage(1); };

  if (isLoading) return <div className="empty-state"><div className="empty-icon"><Search size={21}/></div><h2>Loading skills</h2><p>Finding the best learning opportunities for you...</p></div>;

  return (
    <section className="skills-page">
      <div className="page-header">
        <div><div className="page-eyebrow">Skill marketplace</div><h1 className="page-title">Explore skills</h1><p className="page-subtitle">Discover mentors, compare levels and book a time that works for you.</p></div>
        {user?.role === "admin" && <a href="#add-skill" className="btn-primary"><Plus size={16}/> Add skill</a>}
      </div>

      {error && <div className="form-error" style={{marginBottom:16}}>{error.response?.data?.error || error.message}</div>}

      <div className="surface skills-toolbar">
        <div className="toolbar-head"><div><div className="toolbar-title"><SlidersHorizontal size={16} style={{verticalAlign:"middle",marginRight:7}}/> Refine your search</div><div className="toolbar-caption">Filters are applied instantly.</div></div><button type="button" className="btn-secondary" onClick={clear}><RotateCcw size={14}/> Clear</button></div>
        <div className="filters-grid">
          <div><label className="field-label">Search</label><div className="search-wrap"><Search size={16} className="search-icon"/><input className="field" value={search} onChange={(e)=>{setSearch(e.target.value);setPage(1)}} placeholder="Search by skill name..."/></div></div>
          <div><label className="field-label">Level</label><select className="field" value={level} onChange={(e)=>{setLevel(e.target.value);setPage(1)}}><option value="">All levels</option><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select></div>
          <div><label className="field-label">Availability</label><select className="field" value={available} onChange={(e)=>{setAvailable(e.target.value);setPage(1)}}><option value="">All availability</option><option value="true">Available now</option><option value="false">No open slots</option></select></div>
          <div><label className="field-label">Sort</label><select className="field" value={sort} onChange={(e)=>{setSort(e.target.value);setPage(1)}}><option value="-createdAt">Newest</option><option value="name">Name A-Z</option><option value="-name">Name Z-A</option></select></div>
        </div>
        <div className="filter-footer"><span className="result-count">{result?.pagination?.total ?? skills.length} skills found {isFetching ? "• Updating" : ""}</span></div>
      </div>

      {skills.length === 0 ? <div className="empty-state"><div className="empty-icon"><Search size={21}/></div><h2>No skills found</h2><p>Try changing your search or filters.</p></div> : <div className="skill-grid">{skills.map(skill=><SkillCard key={skill._id ?? skill.id} skill={skill}/>)}</div>}

      {totalPages > 1 && <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginTop:26}}><button className="btn-secondary" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Previous</button><span className="result-count">Page {page} of {totalPages}</span><button className="btn-secondary" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Next</button></div>}
      {user && <div id="add-skill" style={{marginTop:34}}><div className="section-row"><div><h2 className="section-title">Share a skill</h2><p className="page-subtitle">Add a skill you can teach and start accepting bookings.</p></div></div><AddSkillForm/></div>}
    </section>
  );
};
export default SkillsPage;
