import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent';
import {EditorButton} from '../components/atoms/EditorButton/EditorButton';
import TreeStructure from '../components/organism/TreeStructure/TreeStructure';
import { useTreeStructureStore } from '../store/treeStructureStroe';
import { useEditorSocketStore } from '../store/editorSocketStore';
import {io} from "socket.io-client";

import BrowserTerminal from '../components/molecules/BrowserTerminal/BrowserTerminal';
export const ProjectPlayground = () => {
    const {projectId:projectIdfromURL}=useParams();
    const {setProjectId,projectId}=useTreeStructureStore();
    const {setEditorSocket}=useEditorSocketStore();
   useEffect(()=>{
    if(projectIdfromURL)
    setProjectId(projectIdfromURL);
        const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdfromURL
                }
            });
             setEditorSocket(editorSocketConn);
   },[setProjectId,projectIdfromURL,setEditorSocket]);
    
  
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
  <div>
     <BrowserTerminal/>   
    </div>
    </>
  
  )
}

export default ProjectPlayground
