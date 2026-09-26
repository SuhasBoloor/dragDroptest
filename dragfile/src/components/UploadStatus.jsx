import { useDragDrop } from "../context/DragDropContext";

function UploadStatus() {
  const { state, dispatch } = useDragDrop();

  return (
    <div style={{ marginTop: "24px", maxWidth: "520px", marginInline: "auto" }}>
      <p style={{ marginBottom: "16px", fontWeight: 700 }}>
        Status: {state.status}
      </p>

      {state.files.length > 0 ? (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left" }}>
            {state.files.map((file) => (
              <li
                key={file.id}
                style={{
                  padding: "10px 12px",
                  marginBottom: "8px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <strong>{file.name}</strong> — {file.state}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => dispatch({ type: "CLEAR" })}
            style={{
              marginTop: "16px",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Clear
          </button>
        </>
      ) : (
        <p style={{ color: "#64748b" }}>No files uploaded yet.</p>
      )}
    </div>
  );
}

export default UploadStatus;