## Purchase, Inventory, Sales

### Core Product

The core product is limited to the specified `routes` and `data schema`.

### Routes

- [x] Public Routes

  - [x] Login Systems `/login`

- [ ] Protected Routes

  - [ ] Admin Dashboard `/app/dashboard`

    - [ ] Employee

      - [ ] List Employee `/app/employee/:req(list)`

      - [ ] CRUD Employee
        - [ ] Add Employee `/app/employee/:req(add)`
        - [ ] View Employee `/app/employee/:req(view)/:id`
          - [ ] Update Employee
          - [ ] Delete Employee

  - [ ] Salesperson Dashboard `/app/dashboard`

    - [ ] Sales

      - [ ] List Sales Order `/app/sales/:submodule(sales_orders)/:req(list)`

      - [ ] CRUD Sales Order

        - [ ] Create Sales Order `/app/sales/:submodule(sales_orders)/:req(add)`
        - [ ] Read Sales Order `/app/sales/:submodule(sales_orders)/:req(view)/:id`

          - [ ] Update Sales Order

            - [ ] Create Sales Order shipment `/app/inventory/:submodule(delivery_orders)/:req(add)`

            - [ ] CRUD Invoices
              - [ ] Create Invoices `/app/sales/:submodule(invoices)/:req(add)`
              - [ ] Read Invoices `/app/sales/:submodule(invoices)/:req(view)/:id`
                - [ ] Update Invoice
                  - [ ] Register Payment
                  - [ ] Register Refund

  - [ ] Purchase Officer Dashboard

    - [ ] Inventory

      - [ ] List Inventory `/app/inventory/:submodule(products)/:req(list)`

      - [ ] CRUD Inventory
        - [ ] Create Inventory `/app/inventory/:submodule(products)/:req(add)`
        - [ ] Read Inventory `/app/inventory/:submodule(products)/:req(view)/:id`

    - [ ] Purchase

      - [ ] List Purchase Order `/app/purchase/:submodule(purchase_orders)/:req(list)`

      - [ ] CRUD Purchase Order

        - [ ] Create Purchase Order `/app/purchase/:submodule(purchase_orders)/:req(add)`
        - [ ] Read Purchase Order `/app/purchase/:submodule(purchase_orders)/:req(view)/:id`

          - [ ] Update Purchase Order

            - [ ] Create Purchase Order Receipt `/app/inventory/:submodule(receipts)/:req(add)`

            - [ ] CRUD Bills
              - [ ] Create Bills `/app/purchase/:submodule(bills)/:req(add)`
              - [ ] Read Bills `/app/purchase/:submodule(bills)/:req(view)/:id`
              - [ ] Update Bills
                - [ ] Register Payment
                - [ ] Register Refund

### Data Schema

![Data Schema](https://app.lucidchart.com/publicSegments/view/2eed6fc7-bff3-4ee8-be46-e08d80a18144/image.jpeg)
