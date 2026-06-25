import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStroe'
import { useParams } from 'react-router-dom';


const TreeStructure = () => {
   const{treeStructure,setTreeStructure}= useTreeStructureStore();
   const projectId=useParams();
   useEffect(()=>{
    if(treeStructure){
        console.log("tree",treeStructure);
    }else{
    setTreeStructure(projectId);
    }
   },[projectId,setTreeStructure,treeStructure])
  return (
    <div>
  <h2 color='white'>Tree Structure</h2>
    </div>
  )
}

export default TreeStructure
