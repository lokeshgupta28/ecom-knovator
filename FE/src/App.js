import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './Productlist';
import ProductDetail from './ProductDetail';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}/>
          <Route path="/ProductDetail" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;