import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent';
import {EditorButton} from '../components/atoms/EditorButton/EditorButton';
import TreeStructure from '../components/organism/TreeStructure/TreeStructure';
import { useTreeStructureStore } from '../store/treeStructureStroe';

export const ProjectPlayground = () => {
    const {projectId:projectIdfromURL}=useParams();
    const {setProjectId,projectId}=useTreeStructureStore();
   useEffect(()=>{
    setProjectId(projectIdfromURL);
   },[setProjectId,projectIdfromURL]);
    

  return (
    <>
  <div style={{ display: "flex" }}>
    {projectId && (
        <div
            style={{
                backgroundColor: "#333254",
                paddingRight: "10px",
                paddingTop: "0.3vh",
                minWidth: "250px",
                maxWidth: "25%",
                height: "99.7vh",
                overflow: "auto"
            }}
        >
            <TreeStructure />
        </div>
    )}

    <EditorComponent />
</div>

<EditorButton isActive={false} />
<EditorButton isActive={true} />
    </>
  )
}

export default ProjectPlayground
