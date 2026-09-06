import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Album from "./components/Album";
import Repetidas from "./components/Repetidas";
import NovoCliente from "./components/NovoCliente";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/novoCliente" element={<NovoCliente/>}/>
        <Route path="/inicio" element={<Inicio/>}>
          <Route index element={<Album/>}/>
          <Route path="repetidas" element={<Repetidas/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}