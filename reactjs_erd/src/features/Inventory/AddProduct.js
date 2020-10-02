import { AlertFormButton, Loading } from "components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddProductAsync, selectAddProduct } from "./AddProductSlice";

export default function AddProduct() {
  const { isLoading, parameter } = useSelector(selectAddProduct);
  const dispatch = useDispatch();

  const data = !isLoading
    ? [
        {
          type: "form",
          data: {
            controlId: "name",
            type: "text",
            placeholder: "Enter the product name",
            feedback: "Please provide a valid name.",
          },
        },
        {
          type: "form",
          data: {
            controlId: "description",
            type: "text",
            placeholder: "Enter the product description.",
            feedback: "Please provide a valid description.",
          },
        },
        {
          type: "select",
          data: {
            controlId: "currency",
            label: "Currency",
            options: parameter && parameter.currency,
          },
        },
        {
          type: "form",
          data: {
            controlId: "price",
            type: "number",
            placeholder: "Enter the product price.",
            feedback: "Please provide a valid price.",
          },
        },
      ]
    : [];

  console.log(data);
  console.log(parameter);

  React.useEffect(() => {
    if (isLoading) {
      dispatch(fetchAddProductAsync());
    }
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <h5>TODO: Add Product</h5>
      <div className="container w-auto mt-3">
          <AlertFormButton
            data={data}
            // handleChange={handleChange}
            // validated={validated}
            // isLoading={isLoading}
            // res={res}
            // error={error}
            // handleSubmit={handleSubmit}
          />
        </div>
    </>
  );
}
