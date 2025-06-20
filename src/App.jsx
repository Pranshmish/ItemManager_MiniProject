import HomePage from "./Pages/HomePage"
import AddItems from "./Pages/AddItems"
import ViewIteams from "./Pages/ViewItems"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/additems" element={<AddItems />} />
          <Route path="/viewitems" element={<ViewIteams />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
