import "./App.css";

import Map from "./components/map";
import Sidebar from "./components/sidebar";
import PropertyContextProvider from "./context/PropertyContext";

function App() {
  return (
    <PropertyContextProvider>
      <div className="App">
        <Sidebar />
        <Map />
      </div>
    </PropertyContextProvider>
  );
}

export default App;
