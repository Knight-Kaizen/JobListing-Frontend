import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import JobPage from "./pages/jobs/JobPage";
import RegisterPage from "./pages/registration/RegisterPage";

const UserContext = createContext();
export default
function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(()=>{
    console.log('In home page');
  }, [])
  const handleChange = ()=>{
    setShowLogin(showLogin == true? false: true);
  }

  return (
    <UserContext.Provider value={{
      showLogin, setShowLogin
    }}>
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage handleLoginComponent = {handleChange} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}
export { UserContext };
