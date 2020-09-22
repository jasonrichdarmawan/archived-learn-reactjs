import { createSlice } from "@reduxjs/toolkit";

import { firebase } from "api/firebase";

const productsSlice = createSlice({
  name: "products",
  initialState: { isLoading: true, data: [] },
  reducers: {
    fetchProducts: (state, action) => ({
      isLoading: false,
      data: [...action.payload],
    }),
  },
});

export const { fetchProducts } = productsSlice.actions;

export const fetchProductsAsync = () => (dispatch) => {
  const db = firebase.firestore();
  const productsRef = db.collection("product");
  productsRef
    .get()
    .then(function (querySnapshot) {
      return Promise.all(
        querySnapshot.docs.map(function (doc) {
          const data = doc.data();
          console.log(data.currency.get().then((doc) => doc.data()));
          return data.currency
            .get()
            .then(function (doc) {
              return doc.data().code;
            })
            .then(function (currency_code) {
              return {
                id: doc.id,
                data: {
                  product_name: doc.data().name,
                  price: `${currency_code} ${doc.data().priceEach}`,
                  photoURL: doc.data().photoURL,
                  qty: doc.data().qty,
                },
              };
            });
        })
      );
    })
    .then((results) => dispatch(fetchProducts(results)));
};

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
