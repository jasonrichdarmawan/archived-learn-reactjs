### Installation

1. Follow [this instructions](https://firebase.google.com/docs/web/setup) to integrate Firebase and Firestore.
2. Import the firebaseConfig to an `.env` file for the environment variable or `for security reasons` use CMD to set it manually.

Here's a config object populated with example values:
```
var firebaseConfig = {
  apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
  authDomain: "myapp-project-123.firebaseapp.com",
  databaseURL: "https://myapp-project-123.firebaseio.com",
  projectId: "myapp-project-123",
  storageBucket: "myapp-project-123.appspot.com",
  messagingSenderId: "65211879809",
  appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
  measurementId: "G-8GSGZQ44ST"
};
```

.env

```
REACT_APP_FB_API_KEY=
REACT_APP_FB_AUTH_DOMAIN=
REACT_APP_FB_DATABASE_URL=
REACT_APP_FB_PROJECT_ID=
REACT_APP_FB_STORAGE_BUCKET=
REACT_APP_FB_MESSAGING_SENDER_ID=
REACT_APP_FB_APP_ID=
```

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

- [x] Data Schema
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
  - [x] List Operator
  - [ ] Revenue Report
    - [x] Filter: Operator
    - [ ] Revenue Report with Chart
- [x] Dashboard Operator
  - [x] Generate Ticket
  - [x] Scan Ticket
  - [x] Generate Payment Receipt
