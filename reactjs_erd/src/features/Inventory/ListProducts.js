import React from "react";
import Kanban from "components/Kanban";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "./ProductsSlice";
import { Loading } from "components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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

  if (isLoading) return <Loading />;

  return (
    <>
      <h5>TODO: List Products</h5>
      <Link to="/app/inventory/products/add">
        <Button variant="primary" size="sm">
          Create
        </Button>
      </Link>
      <Kanban data={data} />
    </>
  );
}
