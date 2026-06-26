import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStroe'
import {TreeNode} from '../../molecules/TreeNode/TreeNode';



const TreeStructure = () => {
   const{treeStructure,setTreeStructure}= useTreeStructureStore();
  
   useEffect(()=>{
    if(treeStructure){
        console.log("tree",treeStructure);
    }else{
    setTreeStructure();
    }
   },[setTreeStructure,treeStructure])
  return (
    <div>
  <h2 color='white'>Tree Structure</h2>
 {treeStructure?.data && (
    <TreeNode fileFolderData={treeStructure.data} />
)}
    </div>
  )
}
export default TreeStructure
