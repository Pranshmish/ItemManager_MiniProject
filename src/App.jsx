import { useState } from "react";
import HomePage from "./Pages/HomePage"
import AddItems from "./Pages/AddItems"
import ViewItems from "./Pages/ViewItems"
import Login from "./Authentication/Login.jsx"
import Signup from "./Authentication/Signup"
import ProfilePage from "./Pages/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true'
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} 
    setIsAuthenticated={setIsAuthenticated}  />} />
        <Route path="/additems" element={<AddItems />} />
        <Route path="/viewitems" element={<ViewItems />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
