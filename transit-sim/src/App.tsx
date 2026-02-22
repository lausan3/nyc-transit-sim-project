import "./App.css";
import TransitMap from "./components/map";

function App() {
  return (
    <>
      <h1>NYC Transit Traffic Simulation</h1>
      <p>A project to visualize the system bottlenecks of the NYC subway.</p>

      <TransitMap />
    </>
  );
}

export default App;
