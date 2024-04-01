import "./App.css";

// React router
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <p>Navbar</p>
      <h1>TimeFlow</h1>
      <Outlet />
      <p>Footer</p>
    </div>
  );
}

export default App;
