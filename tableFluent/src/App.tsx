import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Table_V9_V2_Sort from "./TableF9_V2_Sort";

function App() {
  return (
    <>
      <p>Ini tabel dnd biasa sort semua sekaligus</p>
      <DndProvider backend={HTML5Backend}>
        <Table_V9_V2_Sort />
      </DndProvider>
      <div style={{ margin: "30px" }}></div>
    </>
  );
}

export default App;
