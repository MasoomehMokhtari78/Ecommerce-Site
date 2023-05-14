import './App.css';
import Categories from './Components/Categories';
import Navbar from './Components/Navbar';
import Slider from './Components/Slider';
import Footer from './Components/Footer'
import Products from './Components/Products';
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Slider></Slider>
      <Categories></Categories>
      <Products></Products>
      <Footer></Footer>
    </div>
    
  );
}

export default App;
