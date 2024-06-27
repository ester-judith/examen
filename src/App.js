import React from "react";
import { NavComp } from "./components/authentication/NavComp";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <NavComp />
    </AuthProvider>
  );
}

export default App;
