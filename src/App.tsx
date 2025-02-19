import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer } from "react";
import { useStore } from "./hooks/useStore";

function App() {
  const { fromLanguaje, setFromLanguage } = useStore();

  return (
    <div className="App">
      <h1>Gogle translate</h1>
      <button onClick={() => setFromLanguage("es")}>CAMBIAR A ESPAÑOL</button>
      {fromLanguaje}
    </div>
  );
}

export default App;
