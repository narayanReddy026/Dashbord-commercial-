import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <div className="">
        <h1 className="text-center p-8 font-serif md:text-6xl text-3xl text-purple-950 antialiased">
          Marketing Dashbord
        </h1>
      </div>
      <Home />
    </div>
  );
}

export default App;
