import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
const navigate = useNavigate()

  return (
    <>

    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/"  >
          Ecom-Knovator
        </Link>
        <div class="">
          <button onClick={()=> navigate('/ProductDetail')} class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Cart
          </button>
        </div>
      </nav>
      </div>
    </>
  );
};
export default Header;
