import React from "react";
import Kanban from "components/Kanban";

export default function ListProducts() {
  // Product_name
  // Price: currency_name + PriceEach
  // photoURL

  const data = [
    {
      photoURL:
        "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
      product_name: "AES",
      price: "Rp5.000",
    },
    {
      photoURL:
        "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
      product_name: "AES",
      price: "Rp5.000",
    },
    {
      photoURL:
        "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
      product_name: "AES",
      price: "Rp5.000",
    },
    {
      photoURL:
        "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
      product_name: "AES",
      price: "Rp5.000",
    },
    {
      photoURL:
        "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
      product_name: "AES",
      price: "Rp5.000",
    },
  ];

  return (
    <>
      <h5>TODO: List Products</h5>
      <Kanban data={data} />
    </>
  );
}
