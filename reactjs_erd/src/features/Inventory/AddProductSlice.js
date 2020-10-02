import { createSlice } from "@reduxjs/toolkit";

import { firebase } from "api/firebase";

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: { isLoading: true, data: [] },
  reducers: {
    fetchAddProduct: (state, action) => ({
      isLoading: false,
      parameter: { ...action.payload },
    }),
  },
});

export const { fetchAddProduct } = addProductSlice.actions;

// TODO: not implemented yet.
export const fetchAddProductAsync = () => (dispatch) => {
  // const payload = [];
  const db = firebase.firestore();
  const currencyRef = db.collection("currency");
  const measurementRef = db.collection("measurement");
  const product_categoryRef = db.collection("product_category");
  const vendorRef = db.collection("vendor");
  Promise.all([
    currencyRef.get(),
    measurementRef.get(),
    product_categoryRef.get(),
    vendorRef.get(),
  ]).then(function (array) {
    return array.map((querySnapshot) =>
      querySnapshot.docs.map(function (doc) {
        const data = doc.data();
      })
    );
  });
};

export const selectAddProduct = (state) => state.addProduct;

export default addProductSlice.reducer;
