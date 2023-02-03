import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DraggableContext from "./DraggableContext";
import Draggable from "./Draggable";
import Openable from "./Openable";

function App() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Draggable>
        <div
          style={{
            display: "block",
            backgroundColor: "blue",
            width: "100px",
            height: "100px",
          }}
        ></div>
      </Draggable>
      <DraggableContext.Provider
        value={{
          bounds: ref,
        }}
      >
        <div
          ref={ref}
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "blue",
            position: "relative",
          }}
        >
          <Draggable>
            <div
              style={{
                display: "block",
                backgroundColor: "red",
                width: "100px",
                height: "100px",
              }}
            ></div>
          </Draggable>
          <Draggable>
            <Openable>
              <div
                style={{
                  backgroundColor: "yellow",
                  width: "200px",
                  height: "200px",
                }}
              >
                Uno
              </div>
              <div
                style={{
                  backgroundColor: "green",
                  width: "100px",
                  height: "100px",
                }}
              >
                Dos
              </div>
            </Openable>
          </Draggable>
        </div>
      </DraggableContext.Provider>
    </div>
  );
}

export default App;
