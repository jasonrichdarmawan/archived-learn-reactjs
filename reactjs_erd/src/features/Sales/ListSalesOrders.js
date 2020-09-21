import { Loading, ResponsiveTable } from "components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesOrdersAsync, selectSalesOrders } from "./SalesOrdersSlice";

export default function ListSalesOrders() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Order Number",
        accessor: "id",
      },
      {
        Header: "Order Date",
        accessor: "timestamp",
      },
      {
        Header: "Delivery Date",
        accessor: "deliveryDate",
      },
      {
        Header: "Expected Date",
        accessor: "expectedDate",
      },
      {
        Header: "Customer",
        accessor: "customer_name",
      },
      {
        Header: "Salesperson",
        accessor: "user_id",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "Invoice Status",
        accessor: "invoiceStatus",
      },
    ],
    []
  );

  const { isLoading, data } = useSelector(selectSalesOrders);
  const dispatch = useDispatch();

  console.log("ListSalesOrders()", data);

  React.useEffect(() => {
    if (Array.isArray(data) && data.length === 0) {
      dispatch(fetchSalesOrdersAsync());
    }
  }, [data]);
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h5>TODO: List Sales Orders</h5>
      {/* <ResponsiveTable /> */}
    </>
  );
}
