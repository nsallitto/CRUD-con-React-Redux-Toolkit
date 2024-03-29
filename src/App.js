import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//TODO---------------------- COMPONENTS --------------------------//
import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-5">
        <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/productos/nuevo" element={<NuevoProducto />} />
            <Route path="/productos/editar/:id" element={<EditarProducto />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
