### Features

- [x] Configuration
  ```
  Car
  First 1 minute: Rp5.000,-
  Price per minute: Rp3.000,-

  Motorcycle
  First 1 minute: Rp3.000,-
  Price per minute: Rp1.000,-
  ```
- [ ] Data Schema
  ```
  users = [
    {
      uid: '',
      type: '', // 0: admin, 1: operator
    }
  ];
  tickets = [
    { 
      token: '',
      status: '', // 0: unpaid, 1: paid
      iat: '',
      exp: '',
      type: '', 0 // 0: motorcycle, 1: car
      registration: '',
      bill: '',
      handler: '' // operator auth.uid
    }
  ]
  ```
- [x] Login System
- [ ] Dashboard Admin
  - [ ] List Operator
  - [ ] Revenue Report with Chart, Filter: Operator
- [ ] Dashboard Operator
  - [ ] Generate Ticket
  - [ ] Scan Ticket
  - [ ] Generate Payment Receipt