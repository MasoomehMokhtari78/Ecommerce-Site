import './App.css';
import Categories from './Components/Categories';
import Navbar from './Components/Navbar';
import Slider from './Components/Slider';
import Footer from './Components/Footer'
import Products from './Components/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<ProductList/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Route>
      </Routes>
      {/* <Navbar></Navbar>
      <Slider></Slider>
      <Categories></Categories>
      <Products></Products>
      <Footer></Footer> */}
      {/* <Cart></Cart> */}
      {/* <Login></Login> */}
      {/* <Register></Register> */}
      {/* <Product></Product> */}
      {/* <ProductList></ProductList> */}
    </BrowserRouter>
    
  );
}

export default App;
