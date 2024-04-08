import "./App.css";

// React router dom
import { Outlet } from "react-router-dom";

// Components
// import Navbar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="container">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
