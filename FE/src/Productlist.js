import React, { useState, useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  function addTOCart(id){
    let array = [];
    if(!sessionStorage.getItem("productId")){
        array.push(id)
        sessionStorage.setItem("productId",JSON.stringify(array))
    }else{
      let  existingIds = JSON.parse(sessionStorage.getItem("productId"));
       if(!existingIds.includes(id)){
        existingIds.push(id)
           sessionStorage.setItem("productId",JSON.stringify(existingIds))
        };
    }
  };
  return (
    <div>
    <Header/>
      <h2>Product List</h2>
      {/* <button type="button" class="btn btn-primary">Primary</button> */}
      <ul class="d-flex justify-content-between mt-5">
        {products.map(product => (
          <div class="d-flex">
            <div class="card" style={{width: '18rem'}}>
  <img class="card-img-top" src={product.image}  alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">{product.name}</h5>
    <p class="card-text">{product.description}</p>
    <p class="card-text">{product.price}</p>
    <button href="#" onClick={()=>addTOCart(product.id)} class="btn btn-primary">Add To Cart</button>
  </div>
</div>
           </div>
         ))}
      </ul>
    </div>
  );
};

export default ProductList;
