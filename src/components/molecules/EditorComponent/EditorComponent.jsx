import { Editor } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { extensionToFileType } from '../../../utils/extensionToFileType';

const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null
    });
 let timerId=null;
    const { activeFileTab } = useActiveFileTabStore();
    const {editorSocket}=useEditorSocketStore();
    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();

        setEditorState(prev => ({
            ...prev,
            theme: data
        }));
    }
    function handleChange(value,e){
         if(timerId!=null){
            clearTimeout(timerId);
         }
 timerId=  setTimeout(()=>{
           const editorContent=value;
        editorSocket.emit("writeFile",{
            data:editorContent,
            pathToFileOrFolder:activeFileTab.path
        })
     },2000)
        
    }

    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    useEffect(() => {
        downloadTheme();
    }, []);


    return (
        <>
            {editorState.theme && (
                <Editor
               
               language={extensionToFileType(activeFileTab?.extension)}
                    defaultLanguage={undefined}
                    value={
                        activeFileTab?.value ||
                        "// Welcome to the playground"
                    }
                     
                    onChange={handleChange}
                    height="100vh"
                    width="100%"
                    onMount={handleEditorTheme}
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    
                />
            )}
        </>
    );
};

export default EditorComponent;