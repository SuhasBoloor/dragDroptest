function ErrorPopup({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "420px",
          padding: "24px 20px",
          boxShadow: "0 20px 45px rgba(15, 23, 42, 0.2)",
          textAlign: "center",
        }}
      >
        <h3 style={{ margin: "0 0 12px", color: "#ef4444" }}>Invalid file type</h3>
        <p style={{ margin: "0 0 18px", color: "#334155", lineHeight: 1.5 }}>
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "#ef4444",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
            padding: "10px 18px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
