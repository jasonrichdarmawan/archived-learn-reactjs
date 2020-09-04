### Concept

Store management system to sells goods and/or services.

### Scope

The scope is limited to the use cases written below which is considered as the core product. Other features such as `Purchase Order` to replenish a `QtyInStock` is not considered a core product.

### Use cases

- [x] Who are the customers? `name, address, contact details`

  ![Customer](https://app.lucidchart.com/publicSegments/view/5deaee2c-e765-483c-ab18-b8a274ec4d92/image.png)

- [x] Who are the repeat shoppers?

  ![Order](https://app.lucidchart.com/publicSegments/view/b79c2cbd-378d-44f4-a317-4a428c9afe3b/image.png)

- [x] What products are best sellers?
  - [x] How many times the product is sold?

    ![Order_Product](https://app.lucidchart.com/publicSegments/view/6b6108f4-0ff7-451f-98bb-6f000a2bff86/image.png)

- [x] Is the order has been fulfilled?

  ![Bridge_Table](https://app.lucidchart.com/publicSegments/view/d74440c3-043a-4893-9e8f-24e7db900579/image.png)

- [x] How many quantity left of a product? `QtyInStock`
  - [x] Do this store has substitute product in the inventory? `type varchar(1) NOT NULL`

  ![Product](https://app.lucidchart.com/publicSegments/view/a6e7c26c-a61b-4d38-9be0-5ff38b8e048f/image.png)

### TableAccess

  ![User](https://app.lucidchart.com/publicSegments/view/3255a5be-20dc-4b6e-bd56-2f199706c53a/image.png)

- [x] TableAccess: SS `sales staff` has access to table `Customer`, `Order` and `Product`. The staff's responsibility is to sell a product.
- [x] TableAccess: FS `fulfillment staff` has access to table `Order`, `Order Product`, `Order Shipment`. The staff's responsibility is to fulfill an order.
- [x] TableAccess: WS `warehouse staff` has access to table `Product`. The staff's responsibility is to maintain `QtyInStock` by issuing `Purchase Order`.

### Entity Relationsihp Diagram Overview

![Overview](https://app.lucidchart.com/publicSegments/view/0ccb65dd-aa75-430a-8120-720950fde47f/image.png)

### Data Integrity

- [x] Customer

  ```
  CREATE TABLE `CUSTOMER` (
  `ID` int,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) ,
  `Street` varchar(50) ,
  `City` varchar(50),
  `Zip` varchar(5),
  `Phone` varchar(11) NOT NULL,
  PRIMARY KEY (`ID`)
  );
  ```

- [x] Order

  ```
  CREATE TABLE `ORDER` (
  `ID` int,
  `CUSTOMER_ID` int NOT NULL,
  PRIMARY KEY (`ID`)
  );
  ```

- [x] Order Product

  ```
  CREATE TABLE `ORDER_PRODUCT` (
  `ID` int,
  `ORDER_ID` int NOT NULL,
  `PRODUCT_ID` int NOT NULL,
  `Quantity` int NOT NULL,
  `PriceEach` int NOT NULL,
  PRIMARY KEY (`ID`)
  );
  ```

- [x] Order Shipment

  ```
  CREATE TABLE `ORDER_SHIPMENT` (
  `ID` int,
  `ORDER_PRODUCT_ID` int NOT NULL,
  `PRODUCT_ID` int NOT NULL,
  `Qty` int NOT NULL,
  `Ref_Desc` varchar(50) NOT NULL,
  `Ship_date` datetime NOT NULL,
  `CUSTOMER_name` varchar(50) NOT NULL,
  `To_street` varchar(50) NOT NULL,
  `To_zip` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
  );
  ```

- [x] Order Product
  ```
  CREATE TABLE `PRODUCT` (
  `ID` int,
  `Name` varchar(50) NOT NULL,
  `QtyInStock` int NOT NULL,
  `Type` varchar(1) NOT NULL,
  `PriceEach` int NOT NULL,
  PRIMARY KEY (`ID`)
  );
  ```
