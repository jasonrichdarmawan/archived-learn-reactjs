import { createSlice } from "@reduxjs/toolkit";

import { firebase } from "api/firebase";

const salesOrdersSlice = createSlice({
  name: "salesOrders",
  initialState: { isLoading: true, data: [] },
  reducers: {
    fetchSalesOrders: (state, action) => ({
      isLoading: false,
      data: [...action.payload],
    }),
  },
});

export const fetchSalesOrdersAsync = () => (dispatch) => {
  const fetchFirestore = firebase
    .app()
    .functions("asia-southeast2")
    .httpsCallable("fetchFirestore");
  fetchFirestore({ collection: "sales_order" }).then(({ data }) => {
    console.log("salesOrdersSlice(), fetchFirestore(), data", data);
    dispatch(fetchSalesOrders(data));
  });
};

export const { fetchSalesOrders } = salesOrdersSlice.actions;

export const selectSalesOrders = (state) => state.salesOrders;

export default salesOrdersSlice.reducer;
