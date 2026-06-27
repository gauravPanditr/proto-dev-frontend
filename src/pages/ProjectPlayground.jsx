import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent';
import {EditorButton} from '../components/atoms/EditorButton/EditorButton';
import TreeStructure from '../components/organism/TreeStructure/TreeStructure';
import { useTreeStructureStore } from '../store/treeStructureStroe';
import { useEditorSocketStore } from '../store/editorSocketStore';
import {io} from "socket.io-client";

import BrowserTerminal from '../components/molecules/BrowserTerminal/BrowserTerminal';
import { useTerminalSocketStore } from '../store/terminalSocketStore';
import Browser from '../components/organism/Browser/Browser';
import { usePortStore } from '../store/portStore';
export const ProjectPlayground = () => {
    const {projectId:projectIdfromURL}=useParams();
    const {setProjectId,projectId}=useTreeStructureStore();
    const {setEditorSocket,editorSocket}=useEditorSocketStore();
    const {  terminalSocket,setTerminalSocket } = useTerminalSocketStore();
    
   useEffect(()=>{
    if(projectIdfromURL)
    setProjectId(projectIdfromURL);
        const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdfromURL
                }
            });

                try {
                const ws = new WebSocket("ws://localhost:4000/terminal?projectId="+projectIdfromURL);
                setTerminalSocket(ws);
                
            } catch(error) {
                console.log("error in ws", error);
            }
            // if(terminalSocket){
            //     terminalSocket?.emit("getPort",{containerName:projectIdfromURL})
            // }

             setEditorSocket(editorSocketConn);
   },[setProjectId,projectIdfromURL,setEditorSocket,setTerminalSocket]);
    
  
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
    <div>
       {projectIdfromURL && terminalSocket &&<Browser projectId={projectIdfromURL}/>}
    </div>
    </>
  
  )
}

export default ProjectPlayground
