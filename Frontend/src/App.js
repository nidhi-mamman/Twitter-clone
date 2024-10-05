// import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Body />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
