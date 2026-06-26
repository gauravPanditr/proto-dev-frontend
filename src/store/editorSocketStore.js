import { create } from "zustand";

export const useEditorSokcetStore=create((set)=>({
    editorSocket:null,
    setEditorSocket:(incomingSocket)=>{
        set({
            editorSocket:incomingSocket
        })
    }
}))