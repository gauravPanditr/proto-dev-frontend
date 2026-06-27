import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStroe";
import { usePortStore } from "./portStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,

    setEditorSocket: (incomingSocket) => {
        const activeFileTabSetter =
            useActiveFileTabStore.getState().setActiveFileTab;
             const portSetter = usePortStore.getState().setPort;
            const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;
        
        
       incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data);
            const fileExtension = data.path.split('.').pop();
            activeFileTabSetter(data.path, data.value, fileExtension);
        });

               incomingSocket?.on("writeFileSuccess", (data) => {
            console.log("Write file success", data);
            incomingSocket.emit("readFile", {
                pathToFileOrFolder: data.path
            });
        
        
        incomingSocket?.on("deleteFileSuccess", () => {
            console.log("Delete file");
            
            projectTreeStructureSetter();
        });


            activeFileTabSetter(
                data.path,
                data.value
            );
        });
        //   incomingSocket?.on("getPortSuccess", ({ port }) => {
        //     console.log("port data", port);
        //     portSetter(port);
        // })

        set({
            editorSocket: incomingSocket,
        });
    },
}));