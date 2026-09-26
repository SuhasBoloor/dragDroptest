import { useState } from "react";
import { useDragDrop } from "../context/DragDropContext";
import { uploadFile } from "../api/uploadFile";

function DropZone() {
  const { state, dispatch } = useDragDrop();
  const [dragCounter, setDragCounter] = useState(0);

  function handleDragEnter(event) {
    event.preventDefault();
    setDragCounter((prev) => prev + 1);
    dispatch({ type: "DRAG_ENTER" });
  }

  function handleDragLeave(event) {
    event.preventDefault();

    setDragCounter((prev) => {
      const nextCount = Math.max(prev - 1, 0);

      if (nextCount === 0) {
        dispatch({ type: "DRAG_LEAVE" });
      }

      return nextCount;
    });
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  async function handleDrop(event) {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files || []);

    if (!files.length) {
      setDragCounter(0);
      return;
    }

    const droppedFiles = files.map((file, index) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      state: "pending",
    }));

    // Keep the raw File objects separate so the state shape stays clean.
    const rawFileMap = new Map(
      droppedFiles.map((fileEntry, index) => [fileEntry.id, files[index]])
    );

    dispatch({ type: "FILES_DROPPED", payload: droppedFiles });
    setDragCounter(0);

    for (const fileEntry of droppedFiles) {
      const rawFile = rawFileMap.get(fileEntry.id);

      dispatch({
        type: "FILE_UPDATED",
        payload: { id: fileEntry.id, state: "uploading" },
      });

      try {
        await uploadFile(rawFile);
        dispatch({
          type: "FILE_UPDATED",
          payload: { id: fileEntry.id, state: "success" },
        });
      } catch (error) {
        dispatch({
          type: "FILE_UPDATED",
          payload: { id: fileEntry.id, state: "error" },
        });
      }
    }

    dispatch({ type: "ALL_DONE" });
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: state.status === "dragging" ? "2px dashed #4f46e5" : "2px dashed #cbd5e1",
        backgroundColor: state.status === "dragging" ? "#eef2ff" : "#f8fafc",
        padding: "40px",
        textAlign: "center",
        borderRadius: "12px",
        transition: "all 0.15s ease",
        cursor: "pointer",
        color: "#334155",
        fontWeight: 600,
      }}
    >
      {state.status === "dragging"
        ? "Drop your files here"
        : "Drag files here or click to select them"}
      <div style={{ fontSize: "0.85rem", marginTop: "8px", color: "#64748b" }}>
        Current status: {state.status}
      </div>
    </div>
  );
}

export default DropZone;