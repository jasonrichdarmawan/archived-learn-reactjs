## Purchase, Inventory, Sales

### Core Product

The core product is limited to the specified `routes` and `data schema`.

### Routes

- [ ] Public Routes

  - [ ] Login Systems `/login`

- [ ] Protected Routes

  - [ ] Admin Dashboard `/app`

    - [ ] Employee

      - [ ] List Employee `/app/employee`

      - [ ] CRUD Employee
        - [ ] Create Employee `/app/employee/create`
        - [ ] Read Employee `/app/employee/:id`
          - [ ] Update Employee
          - [ ] Delete Employee

  - [ ] Salesperson Dashboard `/app`

    - [ ] Sales

      - [ ] List Sales Order `/app/sales`

      - [ ] CRUD Sales Order

        - [ ] Create Sales Order `/app/sales/create`
        - [ ] Read Sales Order `/app/sales/:id`

          - [ ] Update Sales Order

            - [ ] CRUD Invoices
              - [ ] Create Invoices `/app/invoices/create`
              - [ ] Read Invoices `/app/invoices/:id`
                - [ ] Update Invoice
                  - [ ] Register Payment
                  - [ ] Register Refund

  - [ ] Purchase Officer Dashboard

    - [ ] Inventory

      - [ ] List Inventory `/app/inventory`

      - [ ] CRUD Inventory
        - [ ] Create Inventory `/app/inventory/create`
        - [ ] Read Inventory `/app/inventory/:id`

    - [ ] Purchase

      - [ ] List Purchase Order `/app/purchase`

      - [ ] CRUD Purchase Order

        - [ ] Create Purchase Order `/app/purchase/create`
        - [ ] Read Purchase Order `/app/purchase/:id`

          - [ ] Update Purchase Order

            - [ ] CRUD Bills
              - [ ] Create Bills `/app/bills/create`
              - [ ] Read Bills `/app/bills/:id`
              - [ ] Update Bills
                - [ ] Register Payment
                - [ ] Register Refund

### Data Schema

... todo