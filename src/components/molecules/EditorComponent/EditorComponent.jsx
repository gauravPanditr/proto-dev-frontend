import { Editor } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom';

const EditorComponent = () => {

    const [editorState,setEditorState]=useState({
        theme:null
    });
    
    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        console.log(data);
        setEditorState({ ...editorState, theme: data });
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
  { editorState.theme && <Editor
  
    defaultLanguage='javascript'
    defaultValue='// welcome to playground'
    height={'100vh'}
    width={'100%'}
    onMount={handleEditorTheme}
    options={{
        fontSize:18,
        fontFamily:'monospace'
    }}
    >

   </Editor>
}
   </>
  )
}

export default EditorComponent
