import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import JobDetails from "./pages/JobDetails"

function App() {
  return (
    // Activates React Router for entire application
    <BrowserRouter>  
      {/* Navbar is outside Routes so it stays visible on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;