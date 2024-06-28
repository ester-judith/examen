import React from "react";
import { NavComp } from "./components/authentication/NavComp";
import { AuthProvider } from "./context/AuthContext";
import { AuctionBody } from "./components/auctions/Body";

function App() {
  return (
    <AuthProvider>
      <NavComp />
      <AuctionBody />
    </AuthProvider>
  );
}

export default App;
