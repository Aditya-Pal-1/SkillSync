const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import api from "./axios";

export async function fetchSkills(params = {}) {
    const queryParams = {
        page: params.page || 1,
        limit: params.limit || 10,
        sort: params.sort || "-createdAt",
    };

    if (params.search?.trim()) {
        queryParams.search = params.search.trim();
    }

    if (params.level) {
        queryParams.level = params.level;
    }

    if (params.available) {
        queryParams.available = params.available;
    }

    const res = await api.get("/skill", {
        params: queryParams,
    });

    console.log("Sent params:", queryParams);
    console.log("API Response:", res.data);

    return res.data;
}
export  const fetchSkillById=async(skillId)=>{
    const res = await api.get(`/skill/${skillId}`)
    if(!res){
        throw new Error(`failed to fetch (${res.status})`);
    }
    // const json = await res.json();
    // return json.data ?? [] ;
    return res.data;
}
// export const getSkillById = asyncHandler(async (req, res)=>{
//         const skill = await Skill.findById(req.params.id);
//         if(!skill){
//             return res.status(404).json({message: "Skill not found"});
//         }
//         res.status(200).json(skill);
   
// });

// export async function createSkill(skill) {
//   const res = await api.post('/skill', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(skill),
//   });

//   if (!res.ok) {
//     const message = await res.text();
//     throw new Error(
//       `Failed to create skill (${res.status}): ${message}`
//     );
//   }
//   return res.json();
// }


export async function createSkill(skill) {
  const res = await api.post("/skill",skill);
  return res.data;
}