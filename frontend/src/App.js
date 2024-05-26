
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Tienda from './Pages/Tienda/Tienda';
import Productos from './Pages/Productos/Productos';
import Contactanos from './Pages/Contactanos/Contactanos';
import Login from './Pages/Login/Login';
import Carrito from './Pages/Carrito/Carrito';
import Footer from './Components/Footer/Footer';
import Registrar from './Pages/Registrarse/Registrer';
import Phombre from './Pages/Productos/P.hombre/Phombre';
import Pmujer from './Pages/Productos/P.mujer/Pmujer';
import PreviwProd from './Pages/PreviewProd/PreviwProd';
import Compra from './Pages/Compras/Compra';
import Añaarti from './Pages/Admin-Articulos/Añaarti';
import Pedusu from './Pages/Listapedusu/Pedusu';
import Vercom from './Pages/Admin-Pedidos/Vercom';
import Categorias from './Pages/Admin-Categorias/Categorias';
import Diseñusu from './Pages/diseñusu/Diseñusu';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Tienda/>}/>
            <Route path='/Product' element={<Productos/>}/>
            <Route path='/Preview' element={<PreviwProd/>}>
              <Route path=':Productid' element={<PreviwProd/>}/>
            </Route>
            <Route path='/Contactanos' element={<Contactanos/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Carrito' element={<Carrito/>}/>
            <Route path='/Registrar' element={<Registrar/>}/>
            <Route path='/Phombre' element={<Phombre/>}/>
            <Route path='/Pmujer' element={<Pmujer/>}/>
            <Route path='/Compra' element={<Compra/>}/>
            <Route path='/AñadirArticulos' element={<Añaarti/>}/>
            <Route path='/VerPedidos' element={<Pedusu/>}/>
            <Route path='/VerPedidosAdmin' element={<Vercom/>}/>
            <Route path='/Categorias' element={<Categorias/>}/>
            <Route path='/DiseñosSolicitados' element={<Diseñusu/>}/>
          </Routes>
         <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
