import React from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent';
import EditorButton from '../components/atoms/EditorButton/EditorButton';

export const ProjectPlayground = () => {
    const {projectId}=useParams();
  return (
    <>
       <h6>Project Id: {projectId}</h6>
      <EditorComponent/>
      <EditorButton/>
    </>
  )
}

export default ProjectPlayground
