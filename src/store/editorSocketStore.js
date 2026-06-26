import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,

    setEditorSocket: (incomingSocket) => {
        const activeFileTabSetter =
            useActiveFileTabStore.getState().setActiveFileTab;
            
           
        
        
        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data);


               incomingSocket?.on("writeFileSuccess", (data) => {
            console.log("Write file success", data);
            incomingSocket.emit("readFile", {
                pathToFileOrFolder: data.path
            })
        });

            activeFileTabSetter(
                data.path,
                data.value
            );
        });

        set({
            editorSocket: incomingSocket,
        });
    },
}));