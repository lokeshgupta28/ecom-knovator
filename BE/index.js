const express = require("express");
const prodcuts = require("./productsData.json");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/products", async (req, resp) => {
  if (prodcuts.length > 0) {
    resp.status(200).send(prodcuts);
  } else {
    resp.status(404).send({ result: "data not found" });
  }
});

app.post("/placeorder", (req, resp) => {
    let data = req.body;
    if(data){
        let userDetails = data.userDetails;
        let orderDetails = data.products;
        if (
        Object.keys(userDetails).length!==0 &&
          userDetails.firstName !== "" &&
          userDetails.firstName !== null &&
          userDetails.lastName !== "" &&
          userDetails.lastName !== null &&
          userDetails.address !== "" &&
          userDetails.address !== null
        ) {
          let response = {};
          response.status = "success";
          response.orderDetails = orderDetails;
          response.userDetails = userDetails;
          resp.status(200).send(response);
        } else {
          resp.status(400).send("please provide user details");
        }
    }else{
        resp.status(500).send("internal server error")
    }
});
app.listen(5000, () => {
  console.log("listen on 5000");
});
