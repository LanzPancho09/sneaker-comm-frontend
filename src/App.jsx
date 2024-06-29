import Navigation from "./components/Navigation";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import { LoginComponent } from "./components/Login";
import { RegisterComponent } from "./components/Register";
import Market from "./components/Market";
import ItemPreview from "./components/ItemPreview";
import PrivateComponent from "./components/PrivateComponent";

import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />

        {/* Main Router */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sneakers" element={<Market />} />
          <Route path="/product-item" element={<ItemPreview />} />
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
