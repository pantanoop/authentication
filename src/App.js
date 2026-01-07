import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";

// import { set } from "zod";

 
function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
