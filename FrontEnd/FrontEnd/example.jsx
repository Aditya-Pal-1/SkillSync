import { useMemo, useState } from "react"

const SampleComponent=()=>{
    const[skill,setSkill] = useState([]);
    const [count,setCount] = useState(0);
    const stats = useMemo(()=>skill.reduce((acc,s)=>{
        acc[s.level] = (acc[s.level] || 0) +1;
        return acc;
    },{}),[skill]);

    return(
        <>
            <button onClick={()=>setSkill(prev=> [...prev,,{name:`skill${count+1}`,level:['Beginner','intermediate','Advamced'][count%3]}])}>AddSkill</button>
            <button onClick={()=> {setCount(prev=>prev+1)}}>Increamnet Count {count}</button>
            <div>
                <h3>Stats : </h3>
                <ui>
                    <li>Beginner : {stats.Beginner || 0}</li>
                    <li>Intermediate : {stats.Intermediate || 0}</li>
                    <li>Advanced : {stats.Advanced || 0}</li>
                </ui>
            </div>
        </>
    )
}

export default SampleComponent;