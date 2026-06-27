import React, { useEffect, useRef } from "react";
import { usePortStore } from "../../../store/portStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

const Browser = ({ projectId }) => {
    const browserRef = useRef(null);

    const { port } = usePortStore();
    const { editorSocket } = useEditorSocketStore();

    useEffect(() => {
        if (!port && editorSocket && projectId) {
            console.log("Requesting port for", projectId);

            editorSocket.emit("getPort", {
                containerName: projectId,
            });
        }
    }, [port, editorSocket, projectId]);

    if (!port) {
        return <div>Loading...</div>;
    }

    return (
        <iframe
            ref={browserRef}
            src={`http://localhost:${port}`}
            width="100%"
            height="600px"
            title="Preview"
        />
    );
};

export default Browser;