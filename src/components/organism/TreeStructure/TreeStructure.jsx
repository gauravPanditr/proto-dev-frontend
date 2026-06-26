import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStroe'
import {TreeNode} from '../../molecules/TreeNode/TreeNode';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';



const TreeStructure = () => {
   const{treeStructure,setTreeStructure}= useTreeStructureStore();
   const { 
        file,
        isOpen: isFileContextOpen, 
        x: fileContextX, 
        y: fileContextY } = useFileContextMenuStore();

  
   useEffect(()=>{
    if(treeStructure){
        console.log("tree",treeStructure);
    }else{
    setTreeStructure();
    }
   },[setTreeStructure,treeStructure])
  return (
    <>
  {isFileContextOpen && fileContextX && fileContextY && (
            <FileContextMenu 
                x={fileContextX}
                y={fileContextY}
                path={file}
            />
        )}
  
 {treeStructure?.data && (
    <TreeNode fileFolderData={treeStructure.data} />
)}

    </>
  )
}
export default TreeStructure
