import React from "react";
import Kanban from "components/Kanban";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "./ProductsSlice";
import { Loading } from "components";

export default function ListProducts() {
  // Product_name
  // Price: currency_name + PriceEach
  // photoURL
  // qty

  const { isLoading, data } = useSelector(selectProducts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (Array.isArray(data) && data.length === 0 && isLoading)
      dispatch(fetchProductsAsync());
  });

  console.log(data)

  if (isLoading) return <Loading />;

  // const data = [
  //   {
  //     id: "1",
  //     data: {
  //       photoURL:
  //         "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
  //       product_name: "AES",
  //       price: "Rp5.000",
  //       qty: "5",
  //     },
  //   },
  //   {
  //     id: "2",
  //     data: {
  //       photoURL:
  //         "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
  //       product_name: "AES",
  //       price: "Rp5.000",
  //       qty: "5",
  //     },
  //   },
  //   {
  //     id: "3",
  //     data: {
  //       photoURL:
  //         "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
  //       product_name: "AES",
  //       price: "Rp5.000",
  //       qty: "5",
  //     },
  //   },
  //   {
  //     id: "4",
  //     data: {
  //       photoURL:
  //         "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
  //       product_name: "AES",
  //       price: "Rp5.000",
  //       qty: "5",
  //     },
  //   },
  //   {
  //     id: "5",
  //     data: {
  //       photoURL:
  //         "https://tempatkerja.com/web/image?model=product.template&field=image_128&id=10&unique=",
  //       product_name: "AES",
  //       price: "Rp5.000",
  //       qty: "5",
  //     },
  //   },
  // ];

  return (
    <>
      <h5>TODO: List Products</h5>
      <Kanban data={data} />
    </>
  );
}
