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

function dateFormatter(unix) {
  return new Date(unix * 1000).toString().split(" ").slice(0, 5).join(" ");
}

export const fetchSalesOrdersAsync = () => (dispatch) => {
  const db = firebase.firestore();
  const salesOrderRef = db.collection("sales_order");
  salesOrderRef
    .get()
    .then(function (querySnapshot) {
      return Promise.all(
        querySnapshot.docs.map(function (doc) {
          const data = doc.data();

          return Promise.all([data.customer.get(), data.user.get()])
            .then(function (docs) {
              return docs.map((doc) => (doc.exists ? doc.data().name : ""));
            })
            .then(function ([customer_name, user_name]) {
              return {
                id: doc.id,
                data: {
                  id: doc.id,
                  createdDate: data.createdDate
                    ? dateFormatter(data.createdDate.seconds)
                    : "",
                  // deliveryDate,
                  expectedDate: data.expectedDate
                    ? dateFormatter(data.expectedDate.seconds)
                    : "",
                  customer_name,
                  user_name,
                  // total,
                  // invoiceStatus,
                },
              };
            });
        })
      );
    })
    .then((results) => dispatch(fetchSalesOrders(results)));
};

export const { fetchSalesOrders } = salesOrdersSlice.actions;

export const selectSalesOrders = (state) => state.salesOrders;

export default salesOrdersSlice.reducer;
