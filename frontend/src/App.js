import './App.css';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import FavPage from './pages/FavPage'
import { PrivateRoute } from './Components/PrivateRoute';
import GlobalStyle from './css/globalStyles';

function App() {
  return (
    <BrowserRouter>
    <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route 
            path='favs' 
            element={
              <PrivateRoute>
                <FavPage/>
              </PrivateRoute>} />
          <Route path='products/:category' element={<ProductList/>}/>
          <Route path=':id' element={<Product/>}/>
          <Route path="*" element={<Navigate to="/" />} />
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
