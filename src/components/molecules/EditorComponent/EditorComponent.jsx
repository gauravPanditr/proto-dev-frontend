import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { useEditorSokcetStore } from "../../../store/editorSocketStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";

const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null,
    });

    const { editorSocket } = useEditorSokcetStore();
    const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

    async function downloadTheme() {
        const response = await fetch("/Dracula.json");
        const data = await response.json();

        setEditorState(prev => ({
            ...prev,
            theme: data,
        }));
    }

    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme("dracula", editorState.theme);
        monaco.editor.setTheme("dracula");
    }

    useEffect(() => {
        downloadTheme();
    }, []);

    useEffect(() => {
        if (!editorSocket) return;

        const handler = (data) => {
            setActiveFileTab(data.path, data.value);
        };

        editorSocket.on("readFileSuccess", handler);

        return () => {
            editorSocket.off("readFileSuccess", handler);
        };
    }, [editorSocket]);

    return (
        <>
            {editorState.theme && (
                <Editor
                    value={
                        activeFileTab?.value ||
                        "// Welcome to the playground"
                    }
                    defaultLanguage="javascript"
                    height="100vh"
                    width="100%"
                    onMount={handleEditorTheme}
                    options={{
                        fontSize: 18,
                        fontFamily: "monospace",
                    }}
                />
            )}
        </>
    );
};

export default EditorComponent;