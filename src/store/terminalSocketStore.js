// import { create } from "zustand";

// export const useTerminalSocketStore = create((set) => {
//     return {
//         terminalSocket: null,
//         setTerminalSocket: (incomingSocket) => {
//             set({
//                 terminalSocket: incomingSocket
//             });
//         }
//     }
// })
import { create } from "zustand";
import { usePortStore } from "./portStore";

export const useTerminalSocketStore = create((set) => {
    return {
        terminalSocket: null,
        setTerminalSocket: (incomingSocket) => {
            const portSetter = usePortStore.getState().setPort;

            // addEventListener instead of onmessage — won't be overwritten by AttachAddon
            incomingSocket.addEventListener("message", (message) => {
                try {
                    const data = JSON.parse(message.data);
                    if (data.event === "getPortSuccess") {
                        console.log("port data", data.port);
                        portSetter(data.port);
                        message.stopImmediatePropagation(); // block AttachAddon from printing it
                    }
                } catch {
                    // raw terminal output, ignore
                }
            });

            set({ terminalSocket: incomingSocket });
        }
    }
});