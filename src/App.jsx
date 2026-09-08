import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Album from "./components/Album";
import Repetidas from "./components/Repetidas";
import NovoCliente from "./components/NovoCliente";
import CodigoVerificacao from "./components/CodigoVerificacao";
import PedidoRecuperacao from "./components/PedidoRecuperacao";
import RedefinirSenha from "./components/RedefinirSenha";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/PedidoRecuperacao" element={<PedidoRecuperacao/>}/>
        <Route path="/redefinirSenha" element={<RedefinirSenha/>}/>
        <Route path="/novoCliente" element={<NovoCliente/>}/>
        <Route path="/CodigoVerificacao" element={<CodigoVerificacao/>}/>
        <Route path="/inicio" element={<Inicio/>}>
          <Route index element={<Album/>}/>
          <Route path="repetidas" element={<Repetidas/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}