import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [address, setAddress] = useState();
  const productIds = sessionStorage.getItem("productId");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        if (response) {
          if (productIds) {
            const parsedProductIds = JSON.parse(productIds);
            const data = response.data.filter((e) =>
              parsedProductIds.includes(e.id)
            );
            setProducts(data);
          }
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const PlaceOrder = async () => {
    const reqBody = { products };
    reqBody.userDetails = {
      firstName: name,
      lastName: userName,
      address: address,
    };

    await axios
      .post("http://localhost:5000/placeorder", reqBody)
      .then((res) => {
        if (res.status == 200) {
          alert("order successfully placed");
          navigate("/");
          sessionStorage.clear();
        } else {
          alert("something went wrong");
        }
      })
      .catch((res) => res);
  };
  return (
    <>
      <Header />
      {products.length != 0 ? (
        <div>
          <div class="d-flex justify-content-evenly mt-5">
            {products &&
              products.map((res) => {
                return (
                  <>
                    <div key={res.id} style={{}} >
                      <div class="d-flex" >
                        <div class="card" style={{ width: "18rem", minHeight:"500px" }}>
                          <img
                            class="card-img-top"
                            src={res.image}
                            alt="Card image cap"
                          />
                          <div class="card-body">
                            <h5 class="card-title">{res.name}</h5>
                            <p class="card-text">{res.description}</p>
                            <p class="card-text">{res.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div class="">
            <div
              class="input-group w-25 ml-5 mt-5"
              style={{ marginLeft: "34rem" }}
            >
              <input
                type="text"
                class="form-control w-2"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-addon1"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="input-group  w-25 mt-3" style={{ marginLeft: "34rem" }}>
              <input
                type="text"
                class="form-control"
                placeholder="UserName"
                aria-label="UserName"
                aria-describedby="basic-addon1"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div class="input-group w-25 mt-3" style={{ marginLeft: "34rem" }}>
              <input
                type="text"
                class="form-control"
                placeholder="Address"
                aria-label="Address"
                aria-describedby="basic-addon1"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary mt-3"
            onClick={() => PlaceOrder()}
          >
            Place Order
          </button>
        </div>
      ) : (
        <h1>Please Add Some Product</h1>
      )}
    </>
  );
};
export default ProductDetail;
