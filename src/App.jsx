import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import WelcomePage from "./pages/Welcomepage";

function App() {
  return (
    <>
      <center>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signuppage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </BrowserRouter>
      </center>
    </>
  );
}

export default App;
