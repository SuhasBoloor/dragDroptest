import { DragDropProvider } from "./context/DragDropContext";
import DropZone from "./components/DropZone";
import UploadStatus from "./components/UploadStatus";

function App() {
  return (
    <DragDropProvider>
      <div style={{ padding: "32px 16px", maxWidth: "760px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "24px" }}>Drag &amp; Drop Upload</h1>
        <DropZone />
        <UploadStatus />
      </div>
    </DragDropProvider>
  );
}

export default App;