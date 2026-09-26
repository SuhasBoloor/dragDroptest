import { createContext, useContext, useReducer } from "react";

const DragDropContext = createContext(null);

export const initialState = {
  status: "idle", // "idle" | "dragging" | "uploading" | "done"
  files: [], // { id, name, size, state } 
};

export function dragDropReducer(state, action) {
  switch (action.type) {
    case "DRAG_ENTER":
      return { ...state, status: "dragging" };

    case "DRAG_LEAVE":
      return { ...state, status: "idle" };

    case "FILES_DROPPED":
      return {
        ...state,
        status: "uploading",
        files: [...state.files, ...action.payload],
      };

    case "FILE_UPDATED":
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === action.payload.id
            ? { ...file, state: action.payload.state }
            : file
        ),
      };

    case "ALL_DONE":
      return { ...state, status: "done" };

    case "CLEAR":
      return { ...initialState };

    default:
      return state;
  }
}

export function DragDropProvider({ children }) {
  const [state, dispatch] = useReducer(dragDropReducer, initialState);

  return (
    <DragDropContext.Provider value={{ state, dispatch }}>
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(DragDropContext);

  if (!context) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }

  return context;
}