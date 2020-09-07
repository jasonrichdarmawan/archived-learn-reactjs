### Data Schema

firestore collections `users`

```
user.uid = {
  access: number,
  email: string,
  profileUrl: string,
  displayName: string,
  quotes: string,
  githubUrl: string,
}
```

state

```
userData = {
  uid: number,
  access: number,
  email: string,
  profileUrl: string,
  displayName: string,
  quotes: string,
  githubUrl: string,
}
```

### Features

- [ ] Public Routes
  - [ ] Login System
  - [ ] Home `list all of students' profile`
- [ ] Admin Routes
  - [ ] Home `user's profile`, can edit.
  - [ ] Register new student's
  - [ ] Edit student's profile
- [ ] Student Routes
  - [ ] Home `user's profile`, can edit.

### Requirements

- [ ] Only use LocalStorage in 1 class / 1 function. `cancelled`
- [ ] Pass data only with state & props.
