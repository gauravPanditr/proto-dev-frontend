import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent';
import EditorButton from '../components/atoms/EditorButton/EditorButton';
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
       <h6>Project Id: {projectIdfromURL}</h6>
      {projectId && <TreeStructure/>}
      <EditorComponent/>

      <EditorButton/>
      <TreeStructure/>
    </>
  )
}

export default ProjectPlayground
