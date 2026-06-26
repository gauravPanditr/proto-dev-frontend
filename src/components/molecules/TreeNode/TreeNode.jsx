import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";



export const TreeNode = ({
    fileFolderData
}) => {

    const [visibility, setVisibility] = useState({});

    const {editorSocket}=useEditorSocketStore();

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
    }


  function computeExtension(fileFolderData) {
    const names = fileFolderData.name.split(".");
    return names[names.length - 1];
} 


function handleDoubleClick(fileFolderData) {
    console.log("doubleclicked");
    
    console.log("Double clicked on", fileFolderData);


    editorSocket.emit("readFile", {
        pathToFileOrFolder: fileFolderData.path,
    });

    console.log("readFile emitted");
}

 
   

    useEffect(() => {
        console.log("Visibility chanmged", visibility); 
    }, [visibility])

    return (
        ( fileFolderData && 
        <div
            style={{
                paddingLeft: "15px",
                color: "white"
            }}
        >
            {fileFolderData.children /** If the current node is a folder ? */ ? (
                /** If the current node is a folder, render it as a button */
                <button
                    onClick={() => toggleVisibility(fileFolderData.name)}
                    style={{
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        color: "white",
                        backgroundColor: "transparent",
                        padding: "15px",
                        fontSize: "16px",
                        marginTop: "10px"

                    }}
                >
                    {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    {fileFolderData.name}
                </button>
            ) : (
                /** If the current node is not a folder, render it as a p */
                <div style={{ display: "flex", alignItems: "center", justifyContent: "start", }}>
                    <FileIcon extension={computeExtension(fileFolderData)} />
                    <p
                        style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            marginTop: "8px",
                            fontSize: "15px",
                            cursor: "pointer",
                            marginLeft: "18px",
                            // color: "black"
                        }}
                        onDoubleClick={()=>{handleDoubleClick(fileFolderData)}}
                      
                    >
                        {fileFolderData.name}
                    </p>
                </div>
            )}
            {visibility[fileFolderData.name] && fileFolderData.children && (
                fileFolderData.children.map((child) => (
                    <TreeNode 
                        fileFolderData={child}
                        key={child.name}
                    />
                ))
            )}

        </div>)
    )
}