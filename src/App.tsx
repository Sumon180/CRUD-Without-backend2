import { Toaster } from "react-hot-toast";
import Home from "./Home";

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <Toaster position="top-center" />
        <div>
          <h1 className="text-center">TODO App</h1>
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
